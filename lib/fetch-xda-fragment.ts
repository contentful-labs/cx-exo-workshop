import {
  createClient,
  PREVIEW_HOST,
  type ClientOptions,
} from "@contentful/experiences-react";
import { previewApiGetOptions } from "@/lib/preview-api-get-options";

type FragmentOptions = {
  spaceId: string;
  environmentId: string;
  fragmentId: string;
  locale?: string;
};

/**
 * Workshop utility: returns the raw `experienceFragment.get` payload (no
 * `resolveExperience`). Used by the debug preview route only.
 */
export async function fetchXdaFragment(
  fragmentOptions: FragmentOptions,
  clientOptions: ClientOptions,
) {
  const { spaceId, environmentId, fragmentId, locale } = fragmentOptions;

  let client;
  let usePreviewApi = false;
  if ("client" in clientOptions) {
    client = clientOptions.client;
  } else {
    const { accessToken, previewToken, preview, host } = clientOptions;
    usePreviewApi = Boolean(preview);
    if (preview && !previewToken) {
      throw new Error(
        "fetchXdaFragment() called with preview: true but no previewToken was provided",
      );
    }
    const resolvedHost = host ?? (preview ? PREVIEW_HOST : undefined);
    const token = preview ? previewToken! : accessToken;
    client = createClient({
      accessToken: token,
      host: resolvedHost,
    });
  }

  return client.experienceFragment.get(
    spaceId,
    environmentId,
    fragmentId,
    previewApiGetOptions(locale, usePreviewApi),
  );
}
