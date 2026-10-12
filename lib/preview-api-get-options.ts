/**
 * Query params for XDN experience/fragment GET requests.
 *
 * Preview mode is selected by the client (CPA token + preview host), not a
 * `preview` query parameter — the delivery API validates runtime params against
 * the experience contract and rejects unknown keys such as `preview`.
 */
export function previewApiGetOptions(
  locale: string | undefined,
  _usePreviewApi: boolean,
) {
  return { locale };
}
