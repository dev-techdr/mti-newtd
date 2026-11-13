import { libraryCostRecords } from "./procedures/library";

export type CostId = string;

type PublishedCostId =
  | "knee-replacement"
  | "hip-replacement"
  | "heart-bypass"
  | "angioplasty"
  | "heart-valve-replacement"
  | "kidney-transplant"
  | "liver-transplant"
  | "bone-marrow-transplant"
  | "ivf"
  | "spinal-fusion"
  | "sleeve-gastrectomy"
  | "cataract"
  | "hair-transplant"
  | "dental-implant"
  | "breast-cancer-surgery"
  | "brain-tumour-surgery"
  | "health-check"
  | "lasik"
  | "prostate-surgery"
  | "rhinoplasty"
  | "gallbladder-removal"
  | "pediatric-heart-surgery"
  | "cochlear-implant"
  | "heart-valve-repair"
  | "aortic-aneurysm-surgery"
  | "congenital-heart-defect-surgery"
  | "minimally-invasive-heart-surgery"
  | "bilateral-knee-replacement"
  | "revision-knee-replacement"
  | "scoliosis-surgery"
  | "complex-fracture-reconstruction"
  | "lung-cancer-surgery"
  | "colorectal-cancer-surgery"
  | "prostate-cancer-surgery"
  | "liver-cancer-surgery"
  | "pancreatic-cancer-surgery"
  | "spinal-cord-tumour-surgery"
  | "aneurysm-clipping"
  | "deep-brain-stimulation"
  | "epilepsy-surgery"
  | "complex-spine-surgery"
  | "disc-replacement-surgery"
  | "paediatric-liver-transplant"
  | "liver-resection"
  | "pancreatic-surgery"
  | "whipple-procedure"
  | "colorectal-surgery"
  | "gastric-bypass"
  | "hernia-repair"
  | "icsi"
  | "myomectomy"
  | "hysterectomy"
  | "endometriosis-surgery"
  | "ovarian-cyst-removal"
  | "complex-reproductive-surgery"
  | "burn-reconstruction"
  | "facial-reconstruction"
  | "breast-reconstruction"
  | "scar-revision"
  | "microsurgery"
  | "paediatric-neurosurgery"
  | "paediatric-urology"
  | "paediatric-orthopaedic-surgery"
  | "congenital-deformity-correction"
  | "kidney-stone-removal"
  | "bladder-cancer-surgery"
  | "kidney-reconstruction"
  | "robotic-urology-surgery"
  | "heart-transplant"
  | "lung-transplant"
  | "corneal-transplant"
  | "pancreas-transplant"
  | "kidney-pancreas-transplant";

export type CostRecord = {
  id: CostId;
  name: string;
  /** Inclusive indicative range in USD. */
  india: readonly [number, number];
  usa: readonly [number, number];
  uk: readonly [number, number];
  thailand?: readonly [number, number];
  /** Shown instead of a closed US range, for example "USD 300,000+". */
  usaLabel?: string;
  ukLabel?: string;
  /** Rows from the published TechDr guide. Others are planning ranges. */
  guide: boolean;
  unit: string;
};

export const costs: readonly (CostRecord & { id: PublishedCostId })[] = [
  {
    id: "knee-replacement",
    name: "Knee replacement (single)",
    india: [4500, 7000],
    usa: [35000, 50000],
    uk: [18000, 25000],
    thailand: [9000, 14000],
    guide: true,
    unit: "per knee",
  },
  {
    id: "hip-replacement",
    name: "Hip replacement",
    india: [5500, 8000],
    usa: [40000, 55000],
    uk: [18000, 27000],
    guide: true,
    unit: "per hip",
  },
  {
    id: "heart-bypass",
    name: "Heart bypass (CABG)",
    india: [5000, 8500],
    usa: [70000, 150000],
    uk: [25000, 40000],
    thailand: [18000, 28000],
    guide: true,
    unit: "per surgery",
  },
  {
    id: "angioplasty",
    name: "Angioplasty (1 stent)",
    india: [3500, 5500],
    usa: [30000, 50000],
    uk: [12000, 18000],
    guide: true,
    unit: "one stent",
  },
  {
    id: "heart-valve-replacement",
    name: "Heart valve replacement",
    india: [7500, 11000],
    usa: [80000, 170000],
    uk: [30000, 45000],
    guide: true,
    unit: "per valve",
  },
  {
    id: "kidney-transplant",
    name: "Kidney transplant",
    india: [13000, 18000],
    usa: [300000, 300000],
    uk: [60000, 80000],
    thailand: [25000, 40000],
    usaLabel: "USD 300,000+",
    guide: true,
    unit: "recipient surgery package",
  },
  {
    id: "liver-transplant",
    name: "Liver transplant",
    india: [28000, 40000],
    usa: [500000, 500000],
    uk: [100000, 100000],
    usaLabel: "USD 500,000+",
    ukLabel: "USD 100,000+",
    guide: true,
    unit: "recipient surgery package",
  },
  {
    id: "bone-marrow-transplant",
    name: "Bone marrow transplant",
    india: [18000, 40000],
    usa: [300000, 300000],
    uk: [120000, 120000],
    usaLabel: "USD 300,000+",
    ukLabel: "USD 120,000+",
    guide: true,
    unit: "per transplant",
  },
  {
    id: "ivf",
    name: "IVF (per cycle)",
    india: [2500, 4000],
    usa: [15000, 25000],
    uk: [6000, 10000],
    thailand: [4500, 8000],
    guide: true,
    unit: "per cycle",
  },
  {
    id: "spinal-fusion",
    name: "Spinal fusion",
    india: [6000, 9500],
    usa: [80000, 110000],
    uk: [25000, 35000],
    guide: true,
    unit: "per surgery",
  },
  {
    id: "sleeve-gastrectomy",
    name: "Bariatric sleeve",
    india: [5000, 7000],
    usa: [20000, 30000],
    uk: [10000, 15000],
    guide: true,
    unit: "per surgery",
  },
  {
    id: "cataract",
    name: "Cataract surgery",
    india: [600, 1500],
    usa: [3500, 6000],
    uk: [2500, 4000],
    thailand: [1500, 3000],
    guide: true,
    unit: "per eye",
  },
  {
    id: "hair-transplant",
    name: "Hair transplant",
    india: [1000, 2500],
    usa: [8000, 15000],
    uk: [5000, 10000],
    guide: true,
    unit: "per session",
  },
  {
    id: "dental-implant",
    name: "Dental implant",
    india: [500, 900],
    usa: [3000, 5000],
    uk: [2000, 3500],
    guide: true,
    unit: "per tooth",
  },
  {
    id: "breast-cancer-surgery",
    name: "Breast cancer surgery",
    india: [4000, 7000],
    usa: [25000, 60000],
    uk: [15000, 30000],
    guide: true,
    unit: "surgery package",
  },
  {
    id: "brain-tumour-surgery",
    name: "Brain tumour surgery",
    india: [6500, 10000],
    usa: [75000, 150000],
    uk: [30000, 50000],
    guide: true,
    unit: "per surgery",
  },
  {
    id: "health-check",
    name: "Full body health check",
    india: [150, 400],
    usa: [2000, 4000],
    uk: [1000, 2000],
    guide: true,
    unit: "per package",
  },
  {
    id: "lasik",
    name: "LASIK",
    india: [800, 1500],
    usa: [2000, 4000],
    uk: [1500, 3000],
    guide: false,
    unit: "per eye pair",
  },
  {
    id: "prostate-surgery",
    name: "Prostate surgery",
    india: [3500, 7000],
    usa: [15000, 25000],
    uk: [8000, 14000],
    guide: false,
    unit: "per surgery",
  },
  {
    id: "rhinoplasty",
    name: "Rhinoplasty",
    india: [1800, 3500],
    usa: [8000, 15000],
    uk: [5000, 9000],
    guide: false,
    unit: "per surgery",
  },
  {
    id: "gallbladder-removal",
    name: "Gallbladder removal",
    india: [1800, 3000],
    usa: [10000, 20000],
    uk: [5000, 9000],
    guide: false,
    unit: "laparoscopic surgery",
  },
  {
    id: "pediatric-heart-surgery",
    name: "Pediatric heart surgery",
    india: [5000, 9000],
    usa: [30000, 80000],
    uk: [20000, 40000],
    guide: false,
    unit: "per surgery",
  },
  {
    id: "cochlear-implant",
    name: "Cochlear implant",
    india: [11000, 18000],
    usa: [40000, 100000],
    uk: [25000, 50000],
    guide: false,
    unit: "per ear",
  },
  { id: "heart-valve-repair", name: "Heart valve repair", india: [7000, 12000], usa: [70000, 150000], uk: [25000, 45000], guide: false, unit: "per repair" },
  { id: "aortic-aneurysm-surgery", name: "Aortic aneurysm surgery", india: [9000, 16000], usa: [40000, 90000], uk: [20000, 45000], guide: false, unit: "per repair" },
  { id: "congenital-heart-defect-surgery", name: "Congenital heart defect surgery", india: [5500, 12000], usa: [30000, 80000], uk: [20000, 40000], guide: false, unit: "per repair" },
  { id: "minimally-invasive-heart-surgery", name: "Minimally invasive heart surgery", india: [8000, 14000], usa: [40000, 90000], uk: [20000, 40000], guide: false, unit: "per operation" },
  { id: "bilateral-knee-replacement", name: "Bilateral knee replacement", india: [8500, 14000], usa: [60000, 90000], uk: [30000, 45000], guide: false, unit: "both knees" },
  { id: "revision-knee-replacement", name: "Revision knee replacement", india: [7000, 12000], usa: [40000, 70000], uk: [20000, 35000], guide: false, unit: "per knee" },
  { id: "scoliosis-surgery", name: "Scoliosis surgery", india: [9000, 16000], usa: [80000, 150000], uk: [30000, 60000], guide: false, unit: "per fusion" },
  { id: "complex-fracture-reconstruction", name: "Complex fracture reconstruction", india: [4000, 9000], usa: [20000, 50000], uk: [10000, 25000], guide: false, unit: "per reconstruction" },
  { id: "lung-cancer-surgery", name: "Lung cancer surgery", india: [5500, 10000], usa: [30000, 70000], uk: [15000, 30000], guide: false, unit: "per operation" },
  { id: "colorectal-cancer-surgery", name: "Colorectal cancer surgery", india: [5000, 9000], usa: [30000, 60000], uk: [15000, 28000], guide: false, unit: "per operation" },
  { id: "prostate-cancer-surgery", name: "Prostate cancer surgery", india: [5500, 10000], usa: [20000, 40000], uk: [12000, 22000], guide: false, unit: "per operation" },
  { id: "liver-cancer-surgery", name: "Liver cancer surgery", india: [7000, 14000], usa: [40000, 90000], uk: [20000, 40000], guide: false, unit: "per resection" },
  { id: "pancreatic-cancer-surgery", name: "Pancreatic cancer surgery", india: [8000, 15000], usa: [50000, 120000], uk: [25000, 50000], guide: false, unit: "per operation" },
  { id: "spinal-cord-tumour-surgery", name: "Spinal cord tumour surgery", india: [8000, 15000], usa: [60000, 120000], uk: [25000, 50000], guide: false, unit: "per operation" },
  { id: "aneurysm-clipping", name: "Aneurysm clipping", india: [10000, 18000], usa: [60000, 150000], uk: [30000, 60000], guide: false, unit: "per clipping" },
  { id: "deep-brain-stimulation", name: "Deep brain stimulation", india: [18000, 30000], usa: [70000, 150000], uk: [40000, 80000], guide: false, unit: "per system" },
  { id: "epilepsy-surgery", name: "Epilepsy surgery", india: [8000, 15000], usa: [50000, 100000], uk: [25000, 50000], guide: false, unit: "per operation" },
  { id: "complex-spine-surgery", name: "Complex spine surgery", india: [9000, 17000], usa: [80000, 150000], uk: [30000, 60000], guide: false, unit: "per operation" },
  { id: "disc-replacement-surgery", name: "Disc replacement surgery", india: [8000, 14000], usa: [40000, 80000], uk: [20000, 35000], guide: false, unit: "per level" },
  { id: "paediatric-liver-transplant", name: "Paediatric liver transplant", india: [32000, 48000], usa: [400000, 800000], uk: [100000, 200000], guide: false, unit: "per transplant" },
  { id: "liver-resection", name: "Liver resection", india: [7000, 13000], usa: [40000, 80000], uk: [20000, 40000], guide: false, unit: "per resection" },
  { id: "pancreatic-surgery", name: "Pancreatic surgery", india: [7000, 14000], usa: [40000, 100000], uk: [20000, 45000], guide: false, unit: "per operation" },
  { id: "whipple-procedure", name: "Whipple procedure", india: [9000, 16000], usa: [50000, 120000], uk: [25000, 50000], guide: false, unit: "per operation" },
  { id: "colorectal-surgery", name: "Colorectal surgery", india: [4500, 8500], usa: [25000, 55000], uk: [12000, 25000], guide: false, unit: "per operation" },
  { id: "gastric-bypass", name: "Gastric bypass", india: [6500, 9500], usa: [20000, 35000], uk: [10000, 18000], guide: false, unit: "per surgery" },
  { id: "hernia-repair", name: "Hernia repair", india: [1500, 4000], usa: [5000, 15000], uk: [3000, 8000], guide: false, unit: "per repair" },
  { id: "icsi", name: "ICSI", india: [3200, 5500], usa: [16000, 28000], uk: [7000, 12000], guide: false, unit: "per cycle" },
  { id: "myomectomy", name: "Myomectomy", india: [2500, 5500], usa: [10000, 20000], uk: [6000, 12000], guide: false, unit: "per surgery" },
  { id: "hysterectomy", name: "Hysterectomy", india: [2800, 6000], usa: [10000, 25000], uk: [6000, 14000], guide: false, unit: "per surgery" },
  { id: "endometriosis-surgery", name: "Endometriosis surgery", india: [3500, 8000], usa: [12000, 25000], uk: [7000, 15000], guide: false, unit: "per surgery" },
  { id: "ovarian-cyst-removal", name: "Ovarian cyst removal", india: [1800, 4000], usa: [7000, 15000], uk: [4000, 9000], guide: false, unit: "per surgery" },
  { id: "complex-reproductive-surgery", name: "Complex reproductive surgery", india: [4500, 10000], usa: [15000, 35000], uk: [8000, 18000], guide: false, unit: "per surgery" },
  { id: "burn-reconstruction", name: "Burn reconstruction", india: [3000, 15000], usa: [20000, 80000], uk: [10000, 40000], guide: false, unit: "per stage" },
  { id: "facial-reconstruction", name: "Facial reconstruction", india: [4000, 14000], usa: [20000, 70000], uk: [10000, 30000], guide: false, unit: "per stage" },
  { id: "breast-reconstruction", name: "Breast reconstruction", india: [4000, 10000], usa: [15000, 40000], uk: [8000, 20000], guide: false, unit: "per surgery" },
  { id: "scar-revision", name: "Scar revision", india: [800, 3000], usa: [3000, 10000], uk: [2000, 6000], guide: false, unit: "per sitting" },
  { id: "microsurgery", name: "Microsurgery", india: [6000, 16000], usa: [25000, 80000], uk: [15000, 40000], guide: false, unit: "per flap" },
  { id: "paediatric-neurosurgery", name: "Paediatric neurosurgery", india: [7000, 15000], usa: [50000, 120000], uk: [25000, 50000], guide: false, unit: "per operation" },
  { id: "paediatric-urology", name: "Paediatric urology", india: [2500, 6500], usa: [10000, 25000], uk: [6000, 14000], guide: false, unit: "per operation" },
  { id: "paediatric-orthopaedic-surgery", name: "Paediatric orthopaedic surgery", india: [3000, 8000], usa: [15000, 40000], uk: [8000, 20000], guide: false, unit: "per operation" },
  { id: "congenital-deformity-correction", name: "Congenital deformity correction", india: [2000, 8000], usa: [10000, 40000], uk: [6000, 18000], guide: false, unit: "per stage" },
  { id: "kidney-stone-removal", name: "Kidney stone removal", india: [1200, 3500], usa: [8000, 20000], uk: [4000, 10000], guide: false, unit: "per procedure" },
  { id: "bladder-cancer-surgery", name: "Bladder cancer surgery", india: [4000, 10000], usa: [20000, 50000], uk: [10000, 25000], guide: false, unit: "per operation" },
  { id: "kidney-reconstruction", name: "Kidney reconstruction", india: [4000, 9000], usa: [20000, 45000], uk: [10000, 22000], guide: false, unit: "per operation" },
  { id: "robotic-urology-surgery", name: "Robotic urological surgery", india: [6000, 12000], usa: [20000, 45000], uk: [12000, 25000], guide: false, unit: "per operation" },
  { id: "heart-transplant", name: "Heart transplant", india: [50000, 90000], usa: [1000000, 1500000], uk: [150000, 400000], guide: false, unit: "per transplant" },
  { id: "lung-transplant", name: "Lung transplant", india: [60000, 110000], usa: [800000, 1400000], uk: [150000, 400000], guide: false, unit: "per transplant" },
  { id: "corneal-transplant", name: "Corneal transplant", india: [1800, 4500], usa: [15000, 30000], uk: [8000, 20000], guide: false, unit: "per eye" },
  { id: "pancreas-transplant", name: "Pancreas transplant", india: [35000, 60000], usa: [250000, 450000], uk: [80000, 150000], guide: false, unit: "per transplant" },
  { id: "kidney-pancreas-transplant", name: "Kidney and pancreas transplant", india: [45000, 75000], usa: [350000, 600000], uk: [100000, 200000], guide: false, unit: "per transplant" },
];

const publishedIds = new Set<string>(costs.map((row) => row.id));
for (const row of libraryCostRecords) {
  if (publishedIds.has(row.id)) throw new Error(`Cost id clash: ${row.id}`);
}

const byId = new Map<string, CostRecord>([...costs.map((row) => [row.id, row] as const), ...libraryCostRecords.map((row) => [row.id, row] as const)]);

export function getCost(id: CostId) {
  const row = byId.get(id);
  if (!row) throw new Error(`Missing cost: ${id}`);
  return row;
}

export function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function moneyRange(
  range: readonly [number, number],
  label?: string,
) {
  if (label) return label;
  return `${money(range[0])}–${money(range[1])}`;
}

/** Gap between range midpoints. Open-ended labels use the published floor. */
export function midpointSavings(
  india: readonly [number, number],
  other: readonly [number, number],
  openEnded = false,
) {
  const indiaMid = (india[0] + india[1]) / 2;
  const otherMid = openEnded ? other[0] : (other[0] + other[1]) / 2;
  if (otherMid <= 0) return 0;
  return Math.max(0, Math.round((1 - indiaMid / otherMid) * 100));
}
