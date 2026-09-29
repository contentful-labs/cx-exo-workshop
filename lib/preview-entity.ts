/** Contentful `{fragment.sys.type}` resolves to `ExperienceFragment`. */
export function isFragmentEntityType(entityType: string | null | undefined): boolean {
  if (!entityType) return false;
  const normalized = entityType.toLowerCase();
  return normalized === "experiencefragment" || normalized.includes("fragment");
}
