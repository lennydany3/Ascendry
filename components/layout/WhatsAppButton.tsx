import { SITE } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      aria-label="Chat on WhatsApp"
      className="fixed right-6 bottom-6 z-40 flex size-12 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    </a>
  );
}
