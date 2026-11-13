import { SITE } from "@/lib/site";

/**
 * Legal copy. Anything in [square brackets] is an editable default; it renders
 * as plain text, so brackets can stay in the source as markers.
 * Block types: string = paragraph, string[] = bullet list, {h} = sub-heading.
 */
export type Block = string | string[] | { h: string };
export type Section = { id: string; title: string; blocks: Block[] };
export type LegalDoc = {
  slug: string;
  nav: string;
  title: string;
  summary: string;
  sections: Section[];
};

const phone = SITE.phoneDisplay;
const email = SITE.email;

export const privacy: LegalDoc = {
  slug: "privacy-policy",
  nav: "Privacy Policy",
  title: "Privacy Policy",
  summary:
    "What we collect, why we collect it, and the control you have over your information.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        "Ascendry is an MSME (Udyam) registered business based in Chennai, Tamil Nadu, India. We run two divisions:",
        [
          "**Ascendry Studio** builds client work: websites, booking engines, payment flows, WhatsApp automation, admin dashboards, customer portals, inventory systems, loyalty programs, custom APIs, AI workflows and analytics.",
          "**Ascendry Labs** builds and launches Ascendry's own software products in-house.",
        ],
        `This policy explains how we handle personal information across our website, our client work and our products. If you have a question, write to us at ${email} or call ${phone}.`,
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      blocks: [
        { h: "Information you give us" },
        [
          "Your name, email address and phone number.",
          "Business details and project briefs you share with us.",
          "Files, logos, images and other material you send.",
        ],
        { h: "Information collected automatically" },
        [
          "Your IP address, device and browser type.",
          "The pages you visit and how you move around the site.",
          "Cookies and similar technologies (see section 6).",
        ],
        { h: "Payment information" },
        "Payments are processed by Razorpay (cards, UPI, net banking and wallets). We receive a transaction ID and payment status. **We do not see or store your card details.**",
        { h: "Ascendry Labs products" },
        "If you use a Labs product, we collect account data and usage data needed to run it. Each product may have its own additional privacy notice, which applies alongside this policy.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      blocks: [
        [
          "Replying to your enquiries and preparing quotes.",
          "Delivering projects and providing support.",
          "Invoicing and keeping accounts.",
          "Improving our website and products.",
          "Meeting our legal and tax obligations.",
        ],
        "**We do not sell your personal data.**",
      ],
    },
    {
      id: "client-projects",
      title: "Client projects",
      blocks: [
        "When we build a system for a client, the data of that client's own customers belongs to the client. We process it only to build and maintain the system, and only on the client's instructions. If you are a customer of one of our clients, please contact that business first about your data.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing your information",
      blocks: [
        "We share information only with service providers we need to run our business, and only as far as necessary:",
        [
          "Hosting and cloud storage providers.",
          "Email and communication tools.",
          "Analytics providers.",
          "Our payment gateway, Razorpay.",
        ],
        "We may also share information when the law requires it, for example in response to a lawful request from a court or authority.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      blocks: [
        "Cookies are small files stored on your device. We use:",
        [
          "**Essential cookies**, which keep the site working and remember your cookie choice.",
          "**Analytics cookies**, only if you accept them, to understand which pages are useful.",
        ],
        "You can accept or reject non-essential cookies in the banner shown on your first visit, and change your choice at any time using “Cookie settings” in the footer. You can also block or delete cookies in your browser settings. Some parts of the site may not work properly if you block essential cookies.",
      ],
    },
    {
      id: "storage-and-security",
      title: "Data storage and security",
      blocks: [
        "We follow reasonable security practices to protect your information from loss, misuse and unauthorised access. No system is completely secure, but we take care to limit access and use trusted providers.",
        "Some of our providers are reputable companies that may store data on servers outside India. By using our services you understand your information may be processed in those locations.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      blocks: [
        "We keep personal information only for as long as we need it for the purpose it was collected. Invoices and accounting records are kept for the period required by Indian tax law. When information is no longer needed, we delete or anonymise it.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        "You can ask us to:",
        [
          "Show you the personal information we hold about you.",
          "Correct information that is wrong or incomplete.",
          "Delete your information, where we are not required to keep it.",
          "Withdraw consent you have given us.",
          "Nominate another person to exercise these rights for you.",
        ],
        `To make a request, email ${email} from the address linked to your information. We will respond within a reasonable time, and aim to do so within [30 days].`,
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        "Our services are not directed at anyone under 18. We do not knowingly collect personal data from children. If you believe a child has given us information, please contact us and we will delete it.",
      ],
    },
    {
      id: "grievance-officer",
      title: "Grievance Officer",
      blocks: [
        "If you have a concern or complaint about how we handle your information, please contact our Grievance Officer:",
        [
          `**Name:** ${SITE.officer}`,
          `**Email:** ${email}`,
          `**Phone:** ${phone}`,
        ],
        "We acknowledge complaints within [48 hours] and aim to resolve them within [30 days].",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        "We may update this policy from time to time. The “Last updated” date at the top shows when it last changed. If we make a significant change, we will make that clear on the website.",
        "This policy is written in line with the Information Technology Act, 2000 and its rules, and the Digital Personal Data Protection Act, 2023.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "terms-and-conditions",
  nav: "Terms & Conditions",
  title: "Terms & Conditions",
  summary:
    "The agreement between you and Ascendry when you use our website or hire us for a project.",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of these terms",
      blocks: [
        "These terms apply when you use the Ascendry website, hire Ascendry Studio, or use an Ascendry Labs product. “We”, “us” and “Ascendry” mean the business named above, run by its proprietor. “You” means the person or business using our services.",
        "By using our website or paying for our services, you agree to these terms. If you do not agree, please do not use them.",
      ],
    },
    {
      id: "services",
      title: "Our services",
      blocks: [
        [
          "**Ascendry Studio** provides custom client work. Each project is scoped in a written quote or proposal.",
          "**Ascendry Labs** offers our own software products. A product may have its own product-specific terms, which apply together with these terms.",
        ],
      ],
    },
    {
      id: "quotes-and-scope",
      title: "Quotes, scope and changes",
      blocks: [
        "The agreed proposal defines the work. Anything outside that scope is quoted separately before we start it.",
        "Timelines depend on you giving us content, feedback and access on time. If those are delayed, the delivery date moves accordingly.",
      ],
    },
    {
      id: "payments",
      title: "Payments",
      blocks: [
        [
          "Payment terms: [50% advance to start the project, 50% before final delivery or handover].",
          "Prices are in Indian Rupees (INR) unless we agree otherwise in writing.",
          "GST is added where applicable.",
          "Invoices are due within [7] days.",
          "We may pause work on overdue payments until they are settled.",
        ],
        "Online payments are processed securely by Razorpay.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "Your responsibilities",
      blocks: [
        [
          "Give us accurate and complete information.",
          "Make sure you have the right to use all content, logos and images you provide.",
          "Give feedback and approvals in a timely way.",
        ],
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        "Once you have paid in full, you own the final deliverables we created for you.",
        "Ascendry keeps ownership of its pre-existing tools, code libraries and know-how. We grant you a licence to use them as part of your project.",
        "Third-party software, fonts and plugins stay under their own licences.",
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio rights",
      blocks: [
        "We may show completed work in our portfolio and on our website. If you would prefer we did not, tell us in writing and we will respect that.",
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      blocks: [
        "Our work often depends on outside services such as hosting, domains, payment gateways, WhatsApp and Meta APIs, and AI providers. Ascendry is not responsible for their outages, policy changes or fees.",
      ],
    },
    {
      id: "revisions-and-acceptance",
      title: "Revisions and acceptance",
      blocks: [
        "Each milestone includes [2 rounds of revisions]. Additional rounds can be quoted.",
        "Deliverables are treated as accepted if you give no feedback within [7] days of delivery.",
      ],
    },
    {
      id: "support-and-maintenance",
      title: "Support and maintenance",
      blocks: [
        "After launch we provide [14 days] of free bug-fix support for issues in the work we delivered. Ongoing maintenance and improvements are available under a separate plan.",
      ],
    },
    {
      id: "liability",
      title: "Warranties and limit of liability",
      blocks: [
        "We provide our services with reasonable skill and care. We cannot guarantee specific business results such as sales, search rankings or bookings.",
        "To the extent the law allows, our total liability for any claim relating to a project is limited to the amount you paid for that project.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      blocks: [
        "Each side will keep the other's confidential information private and use it only for the project.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      blocks: [
        "Either side may end a project by giving written notice. Work completed up to that point remains payable. Refunds are covered in our Refund & Cancellation Policy.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        "When using our website or Labs products, you agree not to:",
        [
          "Misuse them or interfere with how they work.",
          "Scrape, copy or resell them without permission.",
          "Reverse engineer them.",
          "Use them for anything illegal.",
        ],
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and jurisdiction",
      blocks: [
        "These terms are governed by the laws of India. The courts in Chennai, Tamil Nadu have exclusive jurisdiction over any dispute.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        `We may update these terms from time to time. The “Last updated” date shows the latest version. Questions? Contact us at ${email} or ${phone}.`,
      ],
    },
  ],
};

export const refund: LegalDoc = {
  slug: "refund-cancellation",
  nav: "Refund & Cancellation",
  title: "Refund & Cancellation Policy",
  summary:
    "How cancellations and refunds work for Studio projects and Labs products.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        "This policy applies to every payment made to Ascendry through our website or through Razorpay. Please read it before you pay.",
      ],
    },
    {
      id: "studio",
      title: "Ascendry Studio (custom client work)",
      blocks: [
        [
          "**Cancelling before work starts:** full refund of the advance, minus payment gateway charges.",
          "**Cancelling after work has started:** the advance covers the work already done and is non-refundable. Anything you paid beyond the work completed is refunded proportionally.",
          "**After final delivery:** no refunds once the work is delivered or handed over, or once the deliverable goes live.",
          "**Third-party costs:** amounts paid on your behalf, such as domains, hosting, licences and ad credits, are non-refundable.",
        ],
        "These are our default terms. A signed proposal may state different terms for a specific project, and those apply instead.",
      ],
    },
    {
      id: "labs",
      title: "Ascendry Labs (own products and subscriptions)",
      blocks: [
        [
          "You can cancel at any time.",
          "Access continues until the end of the period you have already paid for.",
          "We do not refund partial periods.",
          "If a product does not work as described, you can ask for a refund within [7] days of your first purchase.",
        ],
      ],
    },
    {
      id: "how-to-request",
      title: "How to request a refund or cancellation",
      blocks: [
        `Email ${email} with your payment ID, the payment date and the reason for your request. You can also call ${phone}.`,
      ],
    },
    {
      id: "processing",
      title: "How we process requests",
      blocks: [
        [
          "We review requests within [3] business days.",
          "Approved refunds are credited to the original payment method within [5–7] business days. Bank timelines may vary.",
        ],
      ],
    },
    {
      id: "failed-payments",
      title: "Failed or duplicate payments",
      blocks: [
        "If a payment fails but money is deducted, or you are charged twice, Razorpay or your bank will normally refund it automatically. If that has not happened, report it to us and we will refund you within [5–7] business days.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        `For anything related to payments, refunds or cancellations, contact us at ${email} or ${phone}.`,
      ],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [privacy, terms, refund];
export const getDoc = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug);
