import type { Client } from "@/lib/clients";

/** Ascendry Labs products. Same shape as client projects so one viewer renders both. */
export const PRODUCTS: Client[] = [
  {
    slug: "crest",
    name: "Crest",
    kind: "Windows app",
    summary:
      "Crest Notch is a dynamic notch for Windows, built with Tauri and React. A notch-style overlay at the top of the screen puts media controls, a file shelf, quick notes, a calendar, screenshots, clipboard history, system monitoring and notifications one glance away. Live on the Microsoft Store.",
    features: [
      "Media controls and a file shelf in the notch",
      "Quick notes, calendar and clipboard history",
      "Screenshots and system monitoring",
      "In-notch notifications",
    ],
    href: "https://crest-beta.vercel.app/",
    extra: { label: "Microsoft Store", href: "https://apps.microsoft.com/detail/9NR4HXTLDN0S" },
    brand: "#9db0ff",
    shots: [
      { src: "/images/labs/crest/landing.png", label: "Landing", alt: "Crest website landing page", width: 1499, height: 1010 },
      { src: "/images/labs/crest/features.png", label: "Features", alt: "Crest feature overview", width: 1496, height: 952 },
      { src: "/images/labs/crest/demo.png", label: "Demo", alt: "Crest notch overlay demo", width: 1349, height: 808 },
      { src: "/images/labs/crest/musicplayer.png", label: "Music player", alt: "Crest media player in the notch", width: 1287, height: 763 },
    ],
  },
  {
    slug: "tide",
    name: "Tide",
    kind: "Habit tracker app",
    summary:
      "Tide is a habit tracker built in Flutter. It is offline-first with local storage on the device, and puts habit tracking at the centre with a lighter to-do list alongside. It is free for everyone, with no payments, wrapped in a sky-blue and cyan water theme.",
    features: [
      "Habit tracking as the main focus",
      "Lighter to-do list on the side",
      "Offline-first, data stored on the device",
      "Free to use, no payments",
    ],
    href: "https://get-tide.vercel.app/",
    brand: "#38bdf8",
    shots: [
      { src: "/images/labs/tide/landing.png", label: "Landing", alt: "Tide website landing page", width: 1639, height: 1014 },
      { src: "/images/labs/tide/product.png", label: "Product", alt: "Tide app screens", width: 1568, height: 1010 },
      { src: "/images/labs/tide/demo.png", label: "Demo", alt: "Tide habit tracking demo", width: 1427, height: 1012 },
    ],
  },
  {
    slug: "portfolio",
    name: "Lenny Dany",
    kind: "Portfolio website",
    summary:
      "The portfolio of Lenny Dany Derek D, a CSE (AI & ML) student at SRM IST and a solo full-stack, desktop and AI/ML engineer. It showcases shipped projects, the stack behind them, and offers internships and freelance builds through Ascendry.",
    features: [
      "Five shipped projects: Crest, Tide, NukePC HRMS, SIMS SmartAssist and the NIC Platform",
      "Stack and skills overview",
      "Internships and freelance enquiries",
    ],
    href: "https://www.lennydany3.tech/",
    brand: "#e5e5e5",
    shots: [
      { src: "/images/labs/lennydany3/landing.png", label: "Landing", alt: "Portfolio landing page", width: 1874, height: 1013 },
      { src: "/images/labs/lennydany3/intro.png", label: "Intro", alt: "Portfolio introduction section", width: 1874, height: 1013 },
      { src: "/images/labs/lennydany3/about.png", label: "About", alt: "Portfolio about section", width: 1880, height: 1015 },
      { src: "/images/labs/lennydany3/contact.png", label: "Contact", alt: "Portfolio contact section", width: 1870, height: 1015 },
    ],
  },
];
