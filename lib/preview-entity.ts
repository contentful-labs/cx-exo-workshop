/**
 * Workshop utility for step 4: detect fragment preview from the `entityType`
 * query param after Contentful redirects from draft enable.
 */
export function isFragmentEntityType(entityType: string | null | undefined): boolean {
  if (!entityType) return false;
  const normalized = entityType.toLowerCase();
  return normalized === "experiencefragment" || normalized.includes("fragment");
}
