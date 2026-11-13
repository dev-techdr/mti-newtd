export const QUOTE_MAX_FILES = 10;
export const QUOTE_MAX_FILE_BYTES = 10 * 1024 * 1024;
export const QUOTE_MAX_TOTAL_BYTES = 30 * 1024 * 1024;

export function quoteFileError(files: { size: number }[]) {
  if (files.length > QUOTE_MAX_FILES) return `Add up to ${QUOTE_MAX_FILES} files.`;
  if (files.some((file) => file.size > QUOTE_MAX_FILE_BYTES)) return "Each file must be 10 MB or smaller.";
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > QUOTE_MAX_TOTAL_BYTES) return "All files together must be 30 MB or smaller.";
  return "";
}
