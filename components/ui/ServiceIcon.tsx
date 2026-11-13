const specialtyIcons: Record<string, string> = {
  orthopedics: "008-joints-rheumatology.svg",
  cardiology: "007-heart.svg",
  oncology: "015-ribbon.svg",
  neurology: "012-brain.svg",
  neurosurgery: "010-brainstorming.svg",
  "organ-transplant": "006-kidney.svg",
  "ivf-fertility": "011-uterus-1.svg",
  "spine-surgery": "003-spine-pain.svg",
  "bariatric-surgery": "013-stomach.svg",
  "cosmetic-surgery": "plastic-surgery.svg",
  ophthalmology: "009-eye.svg",
  "dental-care": "dental.svg",
  urology: "017-urology.svg",
  gastroenterology: "001-intestine.svg",
  "pediatric-surgery": "pediatrics.svg",
  ent: "018-ear.svg",
  "health-checkups": "011-health-check.svg",
  gynaecology: "003-uterus.svg",
  "plastic-surgery": "plastic-surgery.svg",
  nephrology: "006-kidney.svg",
  hepatology: "005-liver.svg",
  pulmonology: "004-lungs.svg",
  "vascular-surgery": "007-heart.svg",
  haematology: "004-bone-marrow.svg",
  "general-surgery": "015-inguinal-hernia.svg",
  rheumatology: "005-arthritis.svg",
  endocrinology: "002-endocrinology.svg",
  dermatology: "dermatology.svg",
  "critical-care": "emergency.svg",
  "pain-rehabilitation": "003-spine-pain.svg",
};

/** A closer organ drawing wins over the specialty icon. */
const procedureIcons: Record<string, string> = {
  "knee-replacement-surgery": "002-knee-pain-in-joints.svg",
  "bilateral-knee-replacement": "002-knee-pain-in-joints.svg",
  "revision-knee-replacement": "002-knee-pain-in-joints.svg",
  "hip-replacement-surgery": "001-hip-fracture.svg",
  osteoarthritis: "005-arthritis.svg",
  "ankle-replacement": "ankle.svg",
  "shoulder-replacement": "shoulder-fracture.svg",
  "reverse-shoulder-replacement": "shoulder-fracture.svg",
  "shoulder-arthroscopy": "shoulder-fracture.svg",
  "shoulder-impingement": "shoulder-fracture.svg",
  "frozen-shoulder": "shoulder-fracture.svg",
  "rotator-cuff-tear": "shoulder-fracture.svg",
  "rotator-cuff-repair": "shoulder-fracture.svg",
  "scoliosis-surgery": "013-scoliosis.svg",
  "liver-transplant": "005-liver.svg",
  "paediatric-liver-transplant": "005-liver.svg",
  "liver-resection": "008-liver-1.svg",
  "liver-cancer-surgery": "008-liver-1.svg",
  "bone-marrow-transplant": "004-bone-marrow.svg",
  "kidney-transplant": "006-kidney.svg",
  "kidney-stone-removal": "006-kidney.svg",
  "kidney-reconstruction": "006-kidney.svg",
  "bladder-cancer-surgery": "002-bladder.svg",
  "breast-cancer-surgery": "010-breast-cancer.svg",
  "brain-tumour-surgery": "016-tumor.svg",
  "spinal-cord-tumour-surgery": "014-spine-tumor.svg",
  "heart-transplant": "007-heart.svg",
  "corneal-transplant": "009-eye.svg",
  "kidney-pancreas-transplant": "006-kidney.svg",
  "hernia-repair": "015-inguinal-hernia.svg",
  myomectomy: "016-fibroids.svg",
  rhinoplasty: "012-rhinoplasty.svg",
  "burn-reconstruction": "017-fire.svg",
  "breast-reconstruction": "018-breast-implant.svg",
};

export function serviceIcon(specialty: string, procedure?: string, size = 48) {
  if (procedure === "lung-cancer-surgery" || procedure === "lung-transplant") return size >= 56 ? "004-lungs.svg" : "009-lunges.svg";
  return (procedure && procedureIcons[procedure]) || specialtyIcons[specialty];
}

export function ServiceIcon({
  specialty,
  procedure,
  size = 48,
}: {
  specialty: string;
  procedure?: string;
  size?: number;
}) {
  const file = serviceIcon(specialty, procedure, size);
  if (!file) return null;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm"
      style={{ width: size, height: size }}
    >
      <img src={`/images/icons/${file}`} alt="" width={size - 12} height={size - 12} className="max-h-full max-w-full object-contain" />
    </span>
  );
}
