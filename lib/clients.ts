export type Client = {
  slug: string;
  name: string;
  /** Short category line, e.g. "Event booking platform". */
  kind: string;
  /** Who it was built for. */
  client: string;
  summary: string;
  features: string[];
  href: string;
  /** Project accent colour, used for small details only. */
  brand: string;
  /** Screenshots from /public/images, first one is shown by default. */
  shots: Shot[];
};

export type Shot = { src: string; label: string; alt: string; width: number; height: number };

export const CLIENTS: Client[] = [
  {
    slug: "heatwave",
    name: "Heatwave",
    kind: "Event booking platform",
    client: "Heatwave, Chennai club & events brand",
    summary:
      "A ticket booking platform for a Chennai-based club and events brand. Attendees sign in with Google or email, register and pay through Razorpay, then get a signed QR pass saved to their account and sent by email. Minimal white-and-red design.",
    features: [
      "Google and email sign-in",
      "Razorpay payments",
      "Signed QR passes, saved and emailed",
      "Role-based admin portal for bookings, payments and gate check-in",
    ],
    href: "https://heatwave-chn.vercel.app/",
    brand: "#E63946",
    shots: [
      { src: "/images/studio/heatwave/landing.png", label: "Event page", alt: "Heatwave event landing page for the Caseano cruise party", width: 1685, height: 855 },
      { src: "/images/studio/heatwave/registation.png", label: "Registration", alt: "Heatwave registration and ticket selection", width: 1328, height: 1013 },
      { src: "/images/studio/heatwave/my_ticket.png", label: "My tickets", alt: "Heatwave attendee ticket dashboard", width: 1556, height: 994 },
      { src: "/images/studio/heatwave/ticket_preview.png", label: "QR pass", alt: "Heatwave signed QR ticket with payment details", width: 1429, height: 995 },
    ],
  },
  {
    slug: "nic",
    name: "NIC",
    kind: "Official club website",
    client: "NextGen Intelligence Club, SRM IST",
    summary:
      "The official website of SRM IST's tech community. A crimson-and-black cyberpunk animation plays on GSAP ScrollTrigger as you scroll, alongside event registrations, an admin dashboard and crew management.",
    features: [
      "Scroll-driven cyberpunk animation (GSAP ScrollTrigger)",
      "Event registrations",
      "Admin dashboard and crew management",
      "Ran Genesis’26: 13 events with QR tickets and coordinator consoles",
    ],
    href: "https://nic-srm.vercel.app/",
    brand: "#DC143C",
    shots: [
      { src: "/images/studio/NIC/landing.png", label: "Landing", alt: "NIC club website landing page", width: 1548, height: 1011 },
      { src: "/images/studio/NIC/about.png", label: "About", alt: "NIC about page", width: 1426, height: 1013 },
      { src: "/images/studio/NIC/genesis-event.png", label: "Genesis’26", alt: "Genesis 26 event page", width: 1475, height: 996 },
      { src: "/images/studio/NIC/registation-closed.png", label: "Registration", alt: "NIC event registration state", width: 1467, height: 932 },
    ],
  },
  {
    slug: "clubsphere",
    name: "ClubSphere",
    kind: "Event hosting platform for college students",
    client: "VDP ClubSphere",
    summary:
      "An event hosting platform for college students. Clubs and student organizers create and publish campus events from one place and handle registrations; students find what’s happening on campus and sign up in a few clicks.",
    features: [
      "Create and publish campus events in one place",
      "Registration handling for organizers",
      "Campus event discovery for students",
      "Sign-up in a few clicks",
    ],
    href: "https://vdpclubsphere.vercel.app/",
    brand: "#6C63FF",
    shots: [
      { src: "/images/studio/clubsphere/landing.png", label: "Landing", alt: "ClubSphere landing page", width: 1466, height: 1011 },
      { src: "/images/studio/clubsphere/events.png", label: "Events", alt: "ClubSphere campus events listing", width: 1557, height: 1011 },
      { src: "/images/studio/clubsphere/clubs.png", label: "Clubs", alt: "ClubSphere clubs directory", width: 1462, height: 1013 },
      { src: "/images/studio/clubsphere/about.png", label: "About", alt: "ClubSphere about page", width: 1545, height: 1010 },
    ],
  },
];
