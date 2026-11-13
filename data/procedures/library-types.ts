/** Planning band for a catalogue page. Prices are indicative, not a hospital tariff. */
export type Band =
  | "med"
  | "endo"
  | "minor"
  | "op"
  | "major"
  | "complex"
  | "device"
  | "premium"
  | "robot"
  | "cancer"
  | "drug"
  | "radio"
  | "cell"
  | "eye"
  | "dental"
  | "arch"
  | "fertility"
  | "rehab"
  | "dialysis"
  | "urgent"
  | "bmt"
  | "kidney-tx"
  | "liver-tx"
  | "pregnancy";

/** [name, specialty, band, fact, extra?] extra: link:slug; rel:slug; slug:custom; also:a,b */
export type LibraryRow = readonly [string, string, Band, string, string?];
