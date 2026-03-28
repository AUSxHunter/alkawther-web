export interface Brand {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  description?: string;
}

export const brands: Brand[] = [
  { id: "br-01", name: "AGSI Steel", logo: "/images/brands/AGSI.png", category: "Steel" },
  { id: "br-02", name: "Hamriya Steel", logo: "/images/brands/hamriya.png", category: "Steel" },
  { id: "br-03", name: "Qatar Steel", logo: "/images/brands/qatar-steel.png", category: "Steel" },
  { id: "br-04", name: "Emirates Steel", logo: "/images/brands/emirates-steel.png", category: "Steel" },
  { id: "br-05", name: "Gulf Steel", logo: "/images/brands/gulf-steel.png", category: "Steel" },
  { id: "br-06", name: "Union Steel", logo: "/images/brands/union-steel.png", category: "Steel" },
  { id: "br-07", name: "Sharjah Cement", logo: "/images/brands/sharjah-cement.png", category: "Cement" },
  { id: "br-08", name: "Polybit", logo: "/images/brands/polybit.png", category: "Waterproofing" },
  { id: "br-09", name: "Jotun", logo: "/images/brands/jotun.png", category: "Paint" },
  { id: "br-10", name: "Conmix", logo: "/images/brands/conmix.png", category: "Adhesives" },
  { id: "br-11", name: "DG Kablo", logo: "/images/brands/dg-kablo.png", category: "Electrical" },
  { id: "br-12", name: "DeWalt", logo: "/images/brands/dewalt.png", category: "Tools" },
  { id: "br-13", name: "Clarke", logo: "/images/brands/clarke.png", category: "Tools" },
  { id: "br-14", name: "Knipex", logo: "/images/brands/knipex.png", category: "Hand Tools" },
];
