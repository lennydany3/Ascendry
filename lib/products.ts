export type ProductStatus = "live" | "beta" | "soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  tags: string[];
  /** Product site or app. Leave undefined until it exists. */
  href?: string;
  /** Sample entry. Set to false (or delete the entry) once it's a real product. */
  placeholder?: boolean;
};

/**
 * Ascendry Labs products. Replace the sample entries below with real ones;
 * the first entry is shown as the featured product.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "product-one",
    name: "Product One",
    tagline: "A short line about what it does.",
    description:
      "Describe the problem this product solves, who it is for, and what makes it worth using. Two or three sentences is plenty.",
    status: "beta",
    tags: ["Web app", "SaaS"],
    placeholder: true,
  },
  {
    slug: "product-two",
    name: "Product Two",
    tagline: "Another product, one clear sentence.",
    description:
      "A brief description of the product, the people it helps and the outcome it gives them.",
    status: "soon",
    tags: ["Automation"],
    placeholder: true,
  },
  {
    slug: "product-three",
    name: "Product Three",
    tagline: "The next idea moving through the lab.",
    description:
      "What it is, who it is for and where it stands today. Replace this with the real story.",
    status: "live",
    tags: ["Mobile", "AI"],
    placeholder: true,
  },
];
