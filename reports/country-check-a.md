# Wave A — check visa and route facts before indexing

Nothing in this wave is indexed. `status` stays `needs-human-check` until a person confirms the lines below. Local treatment prices are not required for a hub.

- Hubs whose sourced facts are complete, apart from that human check: 0
- Hubs blocked on missing facts: 10
- Country × treatment pages indexable: 0
- Country × treatment pages blocked: all of them. None has a sourced local price or a sourced list of treatments patients from that country seek.

Open each source. If a line is wrong, correct the country JSON. Set `status` to `verified` only after that, then deploy.

## Nigeria

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 303. FAQs: 4.

### Visa

- e-Medical listed: no
- Attendant listed: no
- How to apply: Check https://indianvisaonline.gov.in/evisa/tvoa.html and the Indian mission. Do not treat a missing row as an approval.
- Notes: This nationality is not a row on the country-wise e-Visa fee table dated 2026-04-15. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: LOS Lagos, ABV Abuja
- Routes: LOS-DEL direct=unset duration=unset via=none; LOS-BOM direct=unset duration=unset via=none; ABV-DEL direct=unset duration=unset via=none; ABV-BOM direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- faqs: 4 of 8, each answer must be true only for Nigeria
- travel.routesToIndia: LOS-DEL needs direct yes/no and typical duration; LOS-BOM needs direct yes/no and typical duration; ABV-DEL needs direct yes/no and typical duration; ABV-BOM needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Kenya

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 245. FAQs: 4.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: NBO Nairobi
- Routes: NBO-BOM direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 245 words, need 300 that are about Kenya
- faqs: 4 of 8, each answer must be true only for Kenya
- travel.routesToIndia: NBO-BOM needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Ethiopia

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 241. FAQs: 4.

### Visa

- e-Medical listed: no
- Attendant listed: no
- How to apply: Check https://indianvisaonline.gov.in/evisa/tvoa.html and the Indian mission. Do not treat a missing row as an approval.
- Notes: This nationality is not a row on the country-wise e-Visa fee table dated 2026-04-15. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: ADD Addis Ababa
- Routes: ADD-DEL direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 241 words, need 300 that are about Ethiopia
- faqs: 4 of 8, each answer must be true only for Ethiopia
- travel.routesToIndia: ADD-DEL needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Tanzania

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 204. FAQs: 4.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: DAR Dar es Salaam, JRO Kilimanjaro
- Routes: DAR-BOM direct=unset duration=unset via=none; DAR-DEL direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 204 words, need 300 that are about Tanzania
- faqs: 4 of 8, each answer must be true only for Tanzania
- travel.routesToIndia: DAR-BOM needs direct yes/no and typical duration; DAR-DEL needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Bangladesh

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 251. FAQs: 4.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: DAC Dhaka
- Routes: DAC-CCU direct=unset duration=unset via=none; DAC-DEL direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 251 words, need 300 that are about Bangladesh
- faqs: 4 of 8, each answer must be true only for Bangladesh
- visa.eMedicalEligible
- visa.attendantVisa
- travel.routesToIndia: DAC-CCU needs direct yes/no and typical duration; DAC-DEL needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Iraq

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 251. FAQs: 4.

### Visa

- e-Medical listed: no
- Attendant listed: no
- How to apply: Check https://indianvisaonline.gov.in/evisa/tvoa.html and the Indian mission. Do not treat a missing row as an approval.
- Notes: This nationality is not a row on the country-wise e-Visa fee table dated 2026-04-15. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: BGW Baghdad, EBL Erbil, BSR Basra
- Routes: BGW-DEL direct=unset duration=unset via=none; BGW-BOM direct=unset duration=unset via=none; EBL-DEL direct=unset duration=unset via=none; EBL-BOM direct=unset duration=unset via=none; BSR-DEL direct=unset duration=unset via=none; BSR-BOM direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 251 words, need 300 that are about Iraq
- faqs: 4 of 8, each answer must be true only for Iraq
- travel.routesToIndia: BGW-DEL needs direct yes/no and typical duration; BGW-BOM needs direct yes/no and typical duration; EBL-DEL needs direct yes/no and typical duration; EBL-BOM needs direct yes/no and typical duration; BSR-DEL needs direct yes/no and typical duration; BSR-BOM needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Oman

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 260. FAQs: 4.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: MCT Muscat
- Routes: MCT-BOM direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 260 words, need 300 that are about Oman
- faqs: 4 of 8, each answer must be true only for Oman
- travel.routesToIndia: MCT-BOM needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Yemen

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 224. FAQs: 4.

### Visa

- e-Medical listed: no
- Attendant listed: no
- How to apply: Check https://indianvisaonline.gov.in/evisa/tvoa.html and the Indian mission. Do not treat a missing row as an approval.
- Notes: This nationality is not a row on the country-wise e-Visa fee table dated 2026-04-15. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: ADE Aden, SAH Sana'a, GXF Seiyun
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 224 words, need 300 that are about Yemen
- faqs: 4 of 8, each answer must be true only for Yemen
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Uzbekistan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 236. FAQs: 4.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: TAS Tashkent
- Routes: TAS-DEL direct=unset duration=unset via=none
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 236 words, need 300 that are about Uzbekistan
- faqs: 4 of 8, each answer must be true only for Uzbekistan
- travel.routesToIndia: TAS-DEL needs direct yes/no and typical duration
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Afghanistan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 232. FAQs: 4.

### Visa

- e-Medical listed: no
- Attendant listed: no
- How to apply: Check https://indianvisaonline.gov.in/evisa/tvoa.html and the Indian mission. Do not treat a missing row as an approval.
- Notes: This nationality is not a row on the country-wise e-Visa fee table dated 2026-04-15. That table is the list that prices e-Medical and e-Medical Attendant visas. Absence is not a refusal and not permission to travel on another category. Confirm the live form and the Indian mission before anyone books flights.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 232 words, need 300 that are about Afghanistan
- faqs: 4 of 8, each answer must be true only for Afghanistan
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- citation languages (source URL and lastChecked)
- citation currency (source URL and lastChecked)
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)
