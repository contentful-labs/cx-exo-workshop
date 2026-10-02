/**
 * Detect fragment entities for the XDA debug preview (`entityType` query param).
 */
export function isFragmentEntityType(entityType: string | null | undefined): boolean {
  if (!entityType) return false;
  const normalized = entityType.toLowerCase();
  return normalized === "experiencefragment" || normalized.includes("fragment");
}
