export type ClientLogo = {
  id: string;
  name: string;
  /** Short context shown on hover / screen readers */
  context?: string;
  src: string;
  alt: string;
  url?: string;
};

/** Clients, employers, and partners — monochrome assets in `public/brands/clients/`. */
export const clientLogos: ClientLogo[] = [
  {
    id: "adidas",
    name: "adidas",
    context: "Full-time — marketing & product",
    src: "/brands/clients/adidas.svg",
    alt: "adidas logo",
    url: "https://www.adidas.com",
  },
  {
    id: "google",
    name: "Google",
    context: "Contract via Uncorked Studios",
    src: "/brands/clients/google.svg",
    alt: "Google logo",
    url: "https://www.google.com",
  },
  {
    id: "dell",
    name: "Dell",
    context: "Agency contract — 2bit Entertainment",
    src: "/brands/clients/dell.svg",
    alt: "Dell Technologies logo",
    url: "https://www.dell.com",
  },
  {
    id: "washu",
    name: "WashU",
    context: "Contract via Nice Touch",
    src: "/brands/clients/washu.svg",
    alt: "Washington University in St. Louis logo",
    url: "https://wustl.edu",
  },
  {
    id: "co2t",
    name: "CO2T",
    context: "VP, environmental platform",
    src: "/brands/clients/co2t.svg",
    alt: "CO2T logo",
    url: "https://co2t.earth",
  },
  {
    id: "agencies",
    name: "Agencies",
    context: "Uncorked, Nice Touch & partner studios",
    src: "/brands/clients/agencies.svg",
    alt: "Agency partners",
  },
];
