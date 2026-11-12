import * as THREE from "three";

export type MarkState = {
  px: number;
  py: number;
  scrollP: number;
  visible: boolean;
};

const EASE = (() => {
  // cubic-bezier(0.22, 1, 0.36, 1)
  const [x1, y1, x2, y2] = [0.22, 1, 0.36, 1];
  const cx = 3 * x1,
    bx = 3 * (x2 - x1) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * y1,
    by = 3 * (y2 - y1) - cy,
    ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      const d = dx(t);
      if (Math.abs(e) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
})();

type Disposable = { dispose?: () => void };

/**
 * "The Ascent" hero mark: the 3 SVG pieces extruded separately, polished
 * chrome, studio light strips, floor reflection and a faint light shaft.
 * Returns a dispose function, or null if WebGL is unavailable.
 */
export function createMark3D(
  host: HTMLElement,
  state: MarkState,
  opts: { reduced: boolean; t0: number; onFirstFrame: () => void },
): (() => void) | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  const D: Disposable[] = [];
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.localClippingEnabled = true;
  const cv = renderer.domElement;
  cv.style.cssText = "width:100%;height:100%;display:block;";
  host.appendChild(cv);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  // Studio environment: long emissive strips -> highlights on bevels
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x000000);
  const strip = (
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    intensity: number,
  ) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color().setScalar(intensity),
        side: THREE.DoubleSide,
      }),
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    env.add(m);
    D.push(m.geometry, m.material as THREE.Material);
  };
  strip(12, 0.8, -2, 6, 2, 5);
  strip(0.6, 10, -6, 0, 3, 3);
  strip(0.8, 10, 6, 1, -5, 6);
  strip(12, 0.32, 0, 1.6, 7, 2.4);
  strip(12, 0.18, 0, -1.3, 7, 1.1);
  strip(0.22, 10, 2.2, 0, 7, 1.3);
  strip(16, 7, 0, 0, -9, 0.06);
  const pm = new THREE.PMREMGenerator(renderer);
  const envTex = pm.fromScene(env, 0.02).texture;
  pm.dispose();
  D.push(envTex);
  scene.environment = envTex;

  scene.add(new THREE.AmbientLight(0xffffff, 0.02));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-4, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2f5ff, 2.2);
  rim.position.set(4, 2, -5);
  scene.add(rim);

  // Exact mark geometry, extruded per piece
  const S = 1 / 40;
  const depth = 112 * 0.18 * S;
  const bev = 112 * 0.008 * S;
  const floorY = -1.56;
  const P: Record<"l" | "r" | "c", [number, number][]> = {
    l: [[8, 116], [41, 18], [58, 18], [34, 116]],
    r: [[73, 0], [90, 0], [120, 116], [94, 116]],
    c: [[25, 82], [65, 82], [69, 96], [21, 96]],
  };
  const clipUp = new THREE.Plane(new THREE.Vector3(0, 1, 0), -floorY);
  const clipDown = new THREE.Plane(new THREE.Vector3(0, -1, 0), floorY);
  const base = {
    color: 0xd9d9d9,
    metalness: 1,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    transparent: true,
    opacity: 0,
  };
  const mark = new THREE.Group();
  scene.add(mark);
  const mirror = new THREE.Group();
  mirror.scale.y = -1;
  mirror.position.y = 2 * floorY;
  scene.add(mirror);
  const rmark = new THREE.Group();
  mirror.add(rmark);

  type Piece = {
    mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
    rmesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
    base: THREE.Vector3;
  };
  const pieces = {} as Record<"l" | "r" | "c", Piece>;

  (Object.keys(P) as Array<"l" | "r" | "c">).forEach((k) => {
    const shape = new THREE.Shape();
    P[k].forEach(([x, y], i) => {
      const X = (x - 64) * S;
      const Y = (58 - y) * S;
      if (i) shape.lineTo(X, Y);
      else shape.moveTo(X, Y);
    });
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: k === "c" ? depth * 0.97 : depth,
      bevelEnabled: true,
      bevelThickness: bev,
      bevelSize: bev,
      bevelSegments: 4,
      curveSegments: 1,
      steps: 1,
    });
    g.computeBoundingBox();
    const c = new THREE.Vector3();
    g.boundingBox!.getCenter(c);
    g.translate(-c.x, -c.y, -c.z);
    g.computeVertexNormals();
    const m = new THREE.MeshPhysicalMaterial({ ...base, clippingPlanes: [clipUp] });
    const rm = new THREE.MeshPhysicalMaterial({
      ...base,
      clippingPlanes: [clipDown],
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    rm.onBeforeCompile = (sh) => {
      sh.vertexShader =
        "varying float vWY;\n" +
        sh.vertexShader.replace(
          "#include <project_vertex>",
          "#include <project_vertex>\nvWY = (modelMatrix * vec4(transformed, 1.0)).y;",
        );
      sh.fragmentShader =
        "varying float vWY;\n" +
        sh.fragmentShader.replace(
          "#include <dithering_fragment>",
          "#include <dithering_fragment>\ngl_FragColor.a *= smoothstep(" +
            (floorY - 1.1).toFixed(3) +
            ", " +
            floorY.toFixed(3) +
            ", vWY) * 0.12;",
        );
    };
    const mesh = new THREE.Mesh(g, m);
    const rmesh = new THREE.Mesh(g, rm);
    mark.add(mesh);
    rmark.add(rmesh);
    pieces[k] = { mesh, rmesh, base: c.clone() };
    D.push(g, m, rm);
  });

  // Faint light shaft
  const sc = document.createElement("canvas");
  sc.width = 64;
  sc.height = 256;
  const x = sc.getContext("2d")!;
  let gr = x.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 256);
  x.globalCompositeOperation = "destination-in";
  gr = x.createLinearGradient(0, 0, 64, 0);
  gr.addColorStop(0, "rgba(0,0,0,0)");
  gr.addColorStop(0.5, "rgba(0,0,0,1)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 256);
  const stex = new THREE.CanvasTexture(sc);
  const sg = new THREE.PlaneGeometry(3.4, 6.4);
  const pa = sg.attributes.position;
  for (let i = 0; i < pa.count; i++) {
    if (pa.getY(i) > 0) pa.setX(i, pa.getX(i) * 0.22);
  }
  const smat = new THREE.MeshBasicMaterial({
    map: stex,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const shaft = new THREE.Mesh(sg, smat);
  shaft.position.set(0, 1.7, -1.4);
  scene.add(shaft);
  D.push(stex, sg, smat);

  const fit = () => {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan(THREE.MathUtils.degToRad(15));
    const d = Math.max(3.7 / 2 / t, 3.4 / 2 / (t * camera.aspect));
    camera.position.set(0, 0.25, d);
    camera.lookAt(0, -0.05, 0);
    camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(host);

  const A = {
    l: { d: 100, u: 1000, p: [-1.2, -0.9, -2], r: [0, -0.5, 0.25], back: false },
    c: { d: 350, u: 900, p: [-2.4, 0, 0.4], r: [0, 0.35, 0], back: false },
    r: { d: 600, u: 1100, p: [0, -3, 0], r: [0, 0.12, 0], back: true },
  } as const;
  const cl = (v: number) => Math.min(1, Math.max(0, v));
  const backE = (k: number) => {
    const c1 = 0.75;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
  };
  const deg = Math.PI / 180;
  const R = opts.reduced;
  let settled = false;
  let first = true;
  let tx = 0;
  let ty = 0;
  let raf = 0;
  let disposed = false;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!state.visible && !first) return;
    const t = R ? 1e5 : performance.now() - opts.t0;
    (Object.keys(A) as Array<keyof typeof A>).forEach((k) => {
      const a = A[k];
      const pc = pieces[k];
      const lin = cl((t - a.d) / a.u);
      const e = a.back ? backE(lin) : EASE(lin);
      const inv = 1 - e;
      pc.mesh.position.set(
        pc.base.x + a.p[0] * inv,
        pc.base.y + a.p[1] * inv,
        pc.base.z + a.p[2] * inv,
      );
      pc.mesh.rotation.set(a.r[0] * inv, a.r[1] * inv, a.r[2] * inv);
      pc.rmesh.position.copy(pc.mesh.position);
      pc.rmesh.rotation.copy(pc.mesh.rotation);
      const op = cl(lin / 0.35);
      pc.mesh.material.opacity = op;
      pc.rmesh.material.opacity = op;
    });
    if (!settled && t > 1900) {
      settled = true;
      Object.values(pieces).forEach((pc) => {
        pc.mesh.material.transparent = false;
        pc.mesh.material.needsUpdate = true;
      });
    }
    scene.environmentRotation.y = -0.9 + 1.15 * EASE(cl((t - 900) / 1100));
    smat.opacity = 0.07 * EASE(cl((t - 1000) / 1400));
    const idle = R ? 0 : cl((t - 2000) / 1500);
    const ph = (t / 10000) * Math.PI * 2;
    if (!R) {
      tx += (state.py * 8 * deg - tx) * 0.06;
      ty += (state.px * 8 * deg - ty) * 0.06;
    }
    const sp = state.scrollP || 0;
    mark.position.y = Math.sin(ph) * 0.03 * idle;
    mark.rotation.set(
      tx,
      ty + Math.sin(ph + 1.2) * 5 * deg * idle + sp * 25 * deg,
      0,
    );
    mark.scale.setScalar(1 - 0.22 * sp);
    rmark.position.copy(mark.position);
    rmark.rotation.copy(mark.rotation);
    rmark.scale.copy(mark.scale);
    renderer.render(scene, camera);
    if (first) {
      first = false;
      opts.onFirstFrame();
    }
  };
  tick();

  return () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    D.forEach((d) => d.dispose?.());
    renderer.dispose();
    cv.remove();
  };
}
