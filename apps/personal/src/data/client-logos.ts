export type ClientLogo = {
  id: string;
  name: string;
  /** Short context shown on hover / screen readers */
  context?: string;
  /** Official logo asset; omitted when `display` is `text`. */
  src?: string;
  alt: string;
  url?: string;
  /** Render company name typography instead of a logo asset. */
  display?: "logo" | "text";
};

/** Clients, employers, and partners — official marks in `public/brands/clients/` or text labels. */
export const clientLogos: ClientLogo[] = [
  {
    id: "adidas",
    name: "adidas",
    context: "Full-time — marketing & product",
    display: "logo",
    src: "/brands/clients/adidas.svg",
    alt: "adidas logo",
    url: "https://www.adidas.com",
  },
  {
    id: "google",
    name: "Google",
    context: "Contract via Uncorked Studios",
    display: "logo",
    src: "/brands/clients/google.svg",
    alt: "Google logo",
    url: "https://www.google.com",
  },
  {
    id: "dell",
    name: "Dell",
    context: "Agency contract — 2bit Entertainment",
    display: "logo",
    src: "/brands/clients/dell.svg",
    alt: "Dell Technologies logo",
    url: "https://www.dell.com",
  },
  {
    id: "washu",
    name: "WashU",
    context: "Contract via Nice Touch",
    display: "text",
    alt: "Washington University in St. Louis",
    url: "https://wustl.edu",
  },
  {
    id: "co2t",
    name: "CO2T",
    context: "VP, environmental platform",
    display: "text",
    alt: "CO2T",
    url: "https://co2t.earth",
  },
  {
    id: "agencies",
    name: "Agencies",
    context: "Uncorked, Nice Touch & partner studios",
    display: "text",
    alt: "Agency partners",
  },
];
