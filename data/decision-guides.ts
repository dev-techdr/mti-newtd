export type DecisionGuide = { title: string; criteria: string[] };

function guide(title: string, criteria: string[]): DecisionGuide {
  return { title, criteria };
}

/** Balanced criteria a specialist uses. No invented case counts or outcomes. */
export const decisionGuides: Record<string, DecisionGuide> = {
  "knee-replacement-surgery": guide("Which knee implant, or no operation yet?", [
    "Knee replacement is considered when physiotherapy, weight management and medicines no longer control pain or deformity on standing X-rays.",
    "A partial knee implant is discussed only when one compartment is worn and the ligaments are stable. A total knee implant is the usual plan when more than one compartment is worn.",
    "The quote for a knee replacement should name the implant. An unnamed implant is not a choice.",
  ]),
  "hip-replacement-surgery": guide("When is a hip replacement preferred to injections?", [
    "A hip replacement is discussed when groin pain and stiffness limit walking after a real course of non-surgical care, and the X-ray shows joint loss.",
    "An injection can be a test or a delay. It is not a substitute when the joint is already collapsed.",
    "Cemented and uncemented hip implants are different quotes. The surgeon should say which, and why, before you fly.",
  ]),
  "heart-bypass-surgery": guide("Bypass or stents for this angiogram?", [
    "Heart bypass is considered when the heart team reads the angiogram as left-main or multi-vessel disease that stents will not treat as safely.",
    "An urgent chest pain syndrome needs the nearest hospital. It is not a planned flight for heart bypass.",
    "A bypass combined with a valve operation is a different quote from bypass alone.",
  ]),
  angioplasty: guide("One stent, or is bypass the safer plan?", [
    "Angioplasty is a stent procedure for a blockage the cardiologist believes can be opened safely. It is not a smaller version of bypass.",
    "The quote for angioplasty should say how many stents and which type. A second vessel can change the price.",
    "Diabetes, a weak heart pump or a left-main blockage are reasons the heart team may advise bypass instead.",
  ]),
  "heart-valve-replacement": guide("Repair the valve or replace it?", [
    "Heart valve replacement removes the valve. Repair keeps your own tissue and is a different operation, decided from the echo.",
    "A mechanical valve usually means long-term blood thinners. A tissue valve usually does not, and it can wear out.",
    "The quote should name repair versus replacement before anyone treats them as one package.",
  ]),
  "heart-valve-repair": guide("Can this valve be repaired?", [
    "Heart valve repair is offered when the echo shows a leaflet the surgeon expects to save. Not every leaky valve can be repaired.",
    "If repair is unlikely, the honest quote is for replacement, not for a repair that will be abandoned on the day.",
    "A ring, if one is used, should be a line in the heart valve repair quote.",
  ]),
  "kidney-transplant": guide("Is a kidney transplant lawful for this donor?", [
    "A kidney transplant for an international patient needs a lawful living donor and authorisation-committee approval. Paid donation is refused.",
    "Dialysis continues until that approval exists. A flight is not a place on a deceased-donor list.",
    "The recipient operation and the donor operation should be separate lines in the quote.",
  ]),
  "liver-transplant": guide("Resection, or a living-donor liver transplant?", [
    "A liver transplant uses part of a lawful living donor’s liver. It is not a resection, and foreign patients should not plan on an Indian deceased-donor organ.",
    "The committee can say no. If it does, there is no operation.",
    "Donor risk, including serious complications, has to be explained to the donor before tickets are bought.",
  ]),
  "bone-marrow-transplant": guide("Whose cells are being transplanted?", [
    "A bone marrow transplant is autologous when the patient’s own cells are used, and allogeneic when a lawful donor’s cells are used. Those are different risks and different quotes.",
    "Paid donation is refused. A donor search fee belongs on its own line if there is one.",
    "The stay is measured in weeks to months because blood counts fall. A two-week trip is not a transplant.",
  ]),
  "ivf-treatment": guide("IVF or IUI first?", [
    "IUI is considered first when tubes are open, sperm is suitable and the clinic has a reason to expect a simpler step to be enough.",
    "IVF is considered when tubes are blocked, sperm is severely abnormal, IUI has already failed, or the ovarian reserve makes delay a poor plan.",
    "Drugs, genetic testing and a later frozen transfer are separate lines. TechDr does not arrange surrogacy.",
  ]),
  "spinal-fusion-surgery": guide("Decompression alone, or fusion as well?", [
    "Spinal fusion is considered when a slip or an unstable segment is the reason for the pain, not for ordinary disc wear on its own.",
    "A decompression without screws is a different operation. The quote should say which levels, if any, will be fused.",
    "Smoking, weak bone and a mismatch between the scan and the pain are reasons to delay fusion.",
  ]),
  "sleeve-gastrectomy": guide("Sleeve, bypass, or neither yet?", [
    "A sleeve is discussed for selected people a bariatric team has accepted, not for a BMI written in a chat message.",
    "Important reflux often pushes the team toward a bypass instead of a sleeve. The reason should be written down.",
    "Vitamins and follow-up at home are part of the decision. Weight loss is not a promised number of kilos.",
  ]),
  "cataract-surgery": guide("Which lens, and is it one eye or both?", [
    "Cataract surgery replaces a cloudy lens. The standard lens and a premium lens are different prices and different glasses results.",
    "The second eye is a second procedure. It should not be assumed inside a one-eye quote.",
    "A retinal disease can make a premium lens the wrong purchase. The scan decides.",
  ]),
  "hair-transplant": guide("Is there enough donor hair?", [
    "A hair transplant moves your own follicles. It does not create new hair, and a weak donor area is a reason to say no.",
    "The quote should say how many grafts and whether a second session is likely.",
    "Medicines for hair loss, if advised, continue at home and are usually outside the surgical price.",
  ]),
  "dental-implant": guide("Implant now, or graft and wait?", [
    "A dental implant needs enough bone and healthy gums. Smoking and untreated gum disease make failure more likely.",
    "A graft or a sinus lift is a separate step and often a separate trip. It should be its own line.",
    "The fixture, the abutment and the crown should each be named. A price that says only ‘implant’ is incomplete.",
  ]),
  "breast-cancer-surgery": guide("Lumpectomy, mastectomy, or no operation first?", [
    "Breast cancer surgery is one part of care. Radiotherapy and drug treatment are often required and are quoted separately.",
    "Breast-conserving surgery suits selected tumours. A mastectomy is a different operation, and reconstruction can be immediate or later.",
    "The biopsy, not a lump felt in the shower, decides the plan. Slides should travel with you if the team asks.",
  ]),
  "brain-tumour-treatment": guide("Remove, biopsy, or do not operate?", [
    "Brain tumour treatment may be removal, a biopsy, radiosurgery or watching. The MRI location decides, not the package name.",
    "A tumour near speech or movement may need awake mapping, which is a different plan from a surface meningioma.",
    "Radiotherapy and drugs after pathology are separate quotes. Surgery does not promise that every cell is gone.",
  ]),
  "full-body-health-check": guide("A screening package, or a test aimed at a symptom?", [
    "A full-body health check is a screen. It is not a diagnosis and it is not treatment for a symptom you already have.",
    "Adding scans that the history does not justify can find incidental problems and extra cost. Ask which tests change a decision.",
    "An abnormal result needs a named specialist, not a longer package on the same afternoon.",
  ]),
  "lasik-surgery": guide("LASIK, another laser, or glasses?", [
    "LASIK is elective. A thin cornea, unstable glasses or an unhealthy retina is a reason to refuse it.",
    "PRK or SMILE may be safer for some eyes and should be quoted as their own procedures.",
    "The quote for LASIK should say one eye or both. Dry eye and night glare remain possible.",
  ]),
  "lumbar-disc-herniation": guide("Can a lumbar disc herniation settle without surgery?", [
    "Many lumbar disc herniations improve with time, medicines and physiotherapy. Surgery is not the first answer for back pain alone.",
    "A discectomy is considered when leg pain or weakness matches the scan and has not settled, or when bladder or bowel control changes.",
    "New loss of bladder or bowel control is an emergency at the nearest hospital. It is not a planned trip. Slipped disc is another name for a herniated disc, not a reason for a fusion by default.",
  ]),
  "lumbar-spondylosis": guide("Can lumbar spondylosis be treated without surgery?", [
    "Lumbar spondylosis is wear. Most people are treated with physiotherapy and medicines, and the scan finding alone is not a reason to operate.",
    "Surgery is considered when a nerve is compressed or the segment is unstable and non-surgical care has failed.",
    "A fusion for lumbar spondylosis needs a reason beyond ‘wear’. Ask which level and what the operation is meant to change.",
  ]),
  "epilepsy-treatment": guide("Medicines, or epilepsy surgery?", [
    "Epilepsy treatment starts with medicines and a seizure diary. Surgery is for selected drug-resistant epilepsy with a mapped focus.",
    "If the MRI and the video EEG do not agree, the next step may be more testing, including invasive monitoring, which is a separate stage.",
    "Seizure freedom is not promised. Medicines usually continue after an operation until a neurologist changes them.",
  ]),
  "deep-brain-stimulation": guide("Is deep brain stimulation the right device operation?", [
    "Deep brain stimulation is considered after a movement-disorder specialist has already decided medicines are not enough. Parkinson’s disease treatment, the medicine plan, is a different page.",
    "The quote must name the generator, including whether it is rechargeable. An unnamed device is not a specification.",
    "Someone at home must be able to programme that exact system. If nobody can, do not travel for the implant.",
  ]),
  "whipple-procedure": guide("Is this tumour operable, or is chemotherapy the first step?", [
    "A Whipple is considered when a pancreas-protocol CT shows a tumour in the head of the pancreas, the lower bile duct or the duodenum that can be separated from the key arteries.",
    "Vessel involvement often means chemotherapy, not an operation. An inoperable scan should not be turned into a surgical deposit.",
    "Enzyme tablets and, sometimes, new diabetes follow a Whipple. They are a home cost unless a supply is written down.",
  ]),
  "liver-resection": guide("Remove part of the liver, or choose another treatment?", [
    "Liver resection is considered when a tumour or diseased segment can be removed and enough healthy liver will remain.",
    "Cirrhosis, too little remaining liver, or disease in both lobes can make resection unsafe. Ablation, drugs or a transplant assessment are different plans.",
    "A transplant is not included. Foreign patients cannot freely receive an Indian deceased-donor liver.",
  ]),
  "colorectal-surgery": guide("Which segment, and is a stoma likely?", [
    "Colorectal surgery should name the segment, whether the disease is cancer, and the chance of a stoma before you fly.",
    "Chemotherapy and radiotherapy, especially for rectal cancer, are separate quotes. They are not assumed inside the operation price.",
    "Irritable bowel syndrome is not treated by removing bowel. The colonoscopy and CT have to show a reason to operate.",
  ]),
  "gastric-bypass": guide("Bypass or sleeve for this patient?", [
    "Gastric bypass is a malabsorptive operation. It is not a sleeve, and the two should not share one price.",
    "Significant reflux often favours a bypass. The bariatric team should say why this operation was chosen.",
    "Lifelong vitamins are part of the decision. A promised weight target is not.",
  ]),
  icsi: guide("IVF with ICSI, or IVF alone?", [
    "ICSI injects one sperm into an egg. It is added for selected sperm problems, not as a default upgrade.",
    "The quote should say whether ICSI, the drugs and a freezing fee are included in this cycle step.",
    "A pregnancy is not guaranteed. Age-banded information from the clinic is more useful than a package slogan. TechDr does not arrange surrogacy.",
  ]),
  hysterectomy: guide("Is the uterus the cause, and must it be removed?", [
    "A hysterectomy is considered when bleeding, fibroids or a proven disease of the uterus has not responded to simpler care, or when cancer requires it.",
    "Removing the ovaries is a separate decision from removing the uterus. The quote should say which organs go.",
    "Keyhole, vaginal and open hysterectomy are different recoveries. The route should be named before you fly.",
  ]),
  "prostate-surgery": guide("Is this a TURP or a cancer operation?", [
    "Prostate surgery on this page is for blockage or other benign disease. Prostate cancer surgery is a different operation and should be named as such.",
    "A laser or a TURP relieves obstruction. It does not treat prostate cancer.",
    "Ask how long a catheter is likely, and do not book a flight that assumes it is out on a fixed morning.",
  ]),
};

export const prioritySlugs = Object.keys(decisionGuides);
