export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_IMG = "1600607687939-ce8a6c25118c";
export const ABOUT_IMG = "1586023492125-27b2c045efd7";

export type Project = {
  no: string;
  title: string;
  place: string;
  year: string;
  type: string;
  area: string;
  blurb: string;
  image: string;
};

export const projects: Project[] = [
  {
    no: "01",
    title: "Hittin Stair House",
    place: "Riyadh, KSA",
    year: "2026",
    type: "Residential",
    area: "640 m²",
    blurb: "A sculpted oak stair becomes the spine of a three-level family home.",
    image: "1600566752355-35792bedcfea",
  },
  {
    no: "02",
    title: "Grid Loft HQ",
    place: "Dubai, UAE",
    year: "2025",
    type: "Workplace",
    area: "1,200 m²",
    blurb: "Raw concrete, black steel and glass for a 90-person creative agency.",
    image: "1497366811353-6870744d04b2",
  },
  {
    no: "03",
    title: "Monolith Bath",
    place: "Jeddah, KSA",
    year: "2025",
    type: "Residential",
    area: "48 m²",
    blurb: "A graphite wet room carved from a single, continuous material palette.",
    image: "1631679706909-1844bbd07221",
  },
  {
    no: "04",
    title: "Gallery Apartment",
    place: "Lisbon, PT",
    year: "2024",
    type: "Residential",
    area: "180 m²",
    blurb: "White walls, primary colour and a collector's eye for one bold object per room.",
    image: "1493809842364-78817add7ffb",
  },
  {
    no: "05",
    title: "Axis Studio Office",
    place: "London, UK",
    year: "2024",
    type: "Workplace",
    area: "850 m²",
    blurb: "A long linear corridor organises studios, labs and quiet rooms on one axis.",
    image: "1497366216548-37526070297c",
  },
];

export const services = [
  {
    no: "01",
    title: "Interior Architecture",
    text: "Spatial planning, structure-led layouts and detailed construction drawings from concept to site.",
    tags: ["Layouts", "Joinery", "Lighting"],
  },
  {
    no: "02",
    title: "Residential",
    text: "Villas, apartments and penthouses designed around how you actually live, not how a catalogue looks.",
    tags: ["Villas", "Apartments", "Majlis"],
  },
  {
    no: "03",
    title: "Workplace & Retail",
    text: "Offices, showrooms and flagships that turn a brand into a physical, walk-through experience.",
    tags: ["Offices", "Retail", "F&B"],
  },
  {
    no: "04",
    title: "FF&E + Styling",
    text: "Furniture, art and objects sourced worldwide and delivered turnkey, down to the last book.",
    tags: ["Sourcing", "Art", "Turnkey"],
  },
];

export const stats = [
  { n: "140", s: "+", label: "Projects delivered" },
  { n: "12", s: "", label: "Countries" },
  { n: "09", s: "", label: "Years in practice" },
];
