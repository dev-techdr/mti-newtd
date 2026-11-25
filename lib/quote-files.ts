export const QUOTE_MAX_FILES = 10;
export const QUOTE_MAX_FILE_BYTES = 25 * 1024 * 1024;

const allowed = new Set(["pdf", "jpg", "jpeg", "png", "docx", "zip"]);

export function quoteFileError(files: { name: string; size: number }[]) {
  if (files.length > QUOTE_MAX_FILES) return `Add up to ${QUOTE_MAX_FILES} files.`;
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowed.has(ext)) return "Use PDF, JPG, PNG, DOCX or ZIP files.";
    if (file.size > QUOTE_MAX_FILE_BYTES) return "Each file must be 25 MB or smaller.";
  }
  return "";
}
