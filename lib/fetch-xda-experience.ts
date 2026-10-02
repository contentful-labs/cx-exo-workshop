import {
  createClient,
  PREVIEW_HOST,
  type ClientOptions,
} from "@contentful/experiences-react";
import { previewApiGetOptions } from "@/lib/preview-api-get-options";

type ExperienceOptions = {
  spaceId: string;
  environmentId: string;
  experienceId: string;
  locale?: string;
};

/**
 * Workshop utility: returns the raw `experience.get` payload (no
 * `resolveExperience`). Used by the debug preview route only.
 */
export async function fetchXdaExperience(
  experienceOptions: ExperienceOptions,
  clientOptions: ClientOptions,
) {
  const { spaceId, environmentId, experienceId, locale } = experienceOptions;

  let client;
  let usePreviewApi = false;
  if ("client" in clientOptions) {
    client = clientOptions.client;
  } else {
    const { accessToken, previewToken, preview, host } = clientOptions;
    usePreviewApi = Boolean(preview);
    if (preview && !previewToken) {
      throw new Error(
        "fetchXdaExperience() called with preview: true but no previewToken was provided",
      );
    }
    const resolvedHost = host ?? (preview ? PREVIEW_HOST : undefined);
    const token = preview ? previewToken! : accessToken;
    client = createClient({
      accessToken: token,
      host: resolvedHost,
    });
  }

  return client.experience.get(
    spaceId,
    environmentId,
    experienceId,
    previewApiGetOptions(locale, usePreviewApi),
  );
}
