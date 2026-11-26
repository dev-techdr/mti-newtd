# Wave C: check visa and route facts before indexing

Nothing in this wave is indexed. `status` stays `needs-human-check` until a person confirms the lines below. Local treatment prices are not required for a hub.

- Hubs whose sourced facts are complete, apart from that human check: 0
- Hubs blocked on missing facts: 15
- Country × treatment pages indexable: 0
- Country × treatment pages blocked: all of them. None has a sourced local price or a sourced list of treatments patients from that country seek.

Open each source. If a line is wrong, correct the country JSON. Set `status` to `verified` only after that, then deploy.

## Egypt

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 45. FAQs: 0.

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

- unique text: 45 words, need 300 that are about Egypt
- faqs: 0 of 8, each answer must be true only for Egypt
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Seychelles

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 46. FAQs: 0.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 46 words, need 300 that are about Seychelles
- faqs: 0 of 8, each answer must be true only for Seychelles
- visa.eMedicalEligible
- visa.attendantVisa
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## UAE

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about UAE
- faqs: 0 of 8, each answer must be true only for UAE
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Saudi Arabia

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Saudi Arabia
- faqs: 0 of 8, each answer must be true only for Saudi Arabia
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Kuwait

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Kuwait
- faqs: 0 of 8, each answer must be true only for Kuwait
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Bahrain

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Bahrain
- faqs: 0 of 8, each answer must be true only for Bahrain
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Qatar

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Qatar
- faqs: 0 of 8, each answer must be true only for Qatar
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Kazakhstan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 46. FAQs: 0.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 46 words, need 300 that are about Kazakhstan
- faqs: 0 of 8, each answer must be true only for Kazakhstan
- visa.eMedicalEligible
- visa.attendantVisa
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Kyrgyzstan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Kyrgyzstan
- faqs: 0 of 8, each answer must be true only for Kyrgyzstan
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Tajikistan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Tajikistan
- faqs: 0 of 8, each answer must be true only for Tajikistan
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Turkmenistan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 45. FAQs: 0.

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

- unique text: 45 words, need 300 that are about Turkmenistan
- faqs: 0 of 8, each answer must be true only for Turkmenistan
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Azerbaijan

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 43. FAQs: 0.

### Visa

- e-Medical listed: yes
- Attendant listed: yes
- How to apply: Apply at https://indianvisaonline.gov.in/evisa/tvoa.html after the hospital invitation letter is ready. Print the ETA for the airline.
- Notes: The country-wise e-Visa fee table dated 2026-04-15 lists an e-Medical Visa fee of USD 80 and an e-Medical Attendant fee of USD 80. The application page says to upload a photo and the passport page, pay online, and receive an ETA by email. It does not publish how many days a decision takes.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 43 words, need 300 that are about Azerbaijan
- faqs: 0 of 8, each answer must be true only for Azerbaijan
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Mongolia

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 46. FAQs: 0.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 46 words, need 300 that are about Mongolia
- faqs: 0 of 8, each answer must be true only for Mongolia
- visa.eMedicalEligible
- visa.attendantVisa
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Mauritius

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 46. FAQs: 0.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 46 words, need 300 that are about Mauritius
- faqs: 0 of 8, each answer must be true only for Mauritius
- visa.eMedicalEligible
- visa.attendantVisa
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)

## Fiji

- Status: `needs-human-check`. Leave this as needs-human-check until a person opens the visa source and the route source.
- Data gate besides that status: blocked
- Words on the page: 46. FAQs: 0.

### Visa

- e-Medical listed: unset
- Attendant listed: unset
- How to apply: Open https://indianvisaonline.gov.in/evisa/tvoa.html and see whether the form offers e-Medical for this passport. Do not copy a fee from a chat.
- Notes: The 2026-04-15 fee table prints 00 for the e-Medical Visa and the e-Medical Attendant Visa. The only note on that PDF is a 3% bank charge. It does not say whether 00 means free or not offered.
- Apply page: https://indianvisaonline.gov.in/evisa/tvoa.html
- Source: https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf
- Checked: 2026-11-25

### Route

- Airports: none recorded
- Routes: none recorded
- Route checked: unset
- Embassy: unset

### Still missing

- unique text: 46 words, need 300 that are about Fiji
- faqs: 0 of 8, each answer must be true only for Fiji
- visa.eMedicalEligible
- visa.attendantVisa
- travel.airports
- travel.routesToIndia (direct yes/no, duration, source)
- travel.lastChecked (within 180 days)
- citation travel (airline or airport URL and lastChecked)
- languages
- citation languages (source URL and lastChecked)
- currency
- money.paymentMethods
- citation payment (source URL and lastChecked)
- localCareContext.commonReasonsPatientsTravel
- citation careReasons (WHO, ministry, or reputable news URL and lastChecked)
- embassy (name, official URL, lastChecked)
