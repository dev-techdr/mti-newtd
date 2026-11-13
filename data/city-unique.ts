/**
 * City × department and city × condition copy that does not appear on another city page.
 * A combo stays noindex until its entry has at least 300 words.
 */
export const uniqueCityContent: Record<string, string> = {};

export function cityComboKey(city: string, leaf: string) {
  return `${city}/${leaf}`;
}

export function uniqueCityWords(city: string, leaf: string) {
  const text = uniqueCityContent[cityComboKey(city, leaf)] ?? "";
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function cityComboIndexable(city: string, leaf: string) {
  return uniqueCityWords(city, leaf) >= 300;
}
