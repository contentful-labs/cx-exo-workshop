/**
 * Query params for Experience Delivery preview mode (preview.xdn.contentful.com
 * + CPA token). See @contentful/experience-delivery README → Preview client.
 */
export function previewApiGetOptions(
  locale: string | undefined,
  usePreviewApi: boolean,
) {
  if (!usePreviewApi) {
    return { locale };
  }
  return { locale, preview: "true" };
}
