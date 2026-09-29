import {
  createClient,
  PREVIEW_HOST,
  type ClientOptions,
  type ExperiencePayload,
  type ResolveOptions,
  resolveExperience,
} from "@contentful/experiences-react";
import { createDebugLogger } from "@contentful/experiences-sdk-core";

type FragmentOptions = {
  spaceId: string;
  environmentId: string;
  fragmentId: string;
  locale?: string;
};

/**
 * Mirrors `fetchExperience` until the client package exports `fetchFragment`.
 * Fetches an experience fragment from XDA and resolves it to a render plan.
 */
export async function fetchFragment(
  fragmentOptions: FragmentOptions,
  clientOptions: ClientOptions,
  resolveOptions: ResolveOptions,
) {
  const { spaceId, environmentId, fragmentId, locale } = fragmentOptions;
  const { config, metadata, debug, initialViewportId } = resolveOptions;
  const log = createDebugLogger(debug, "client");

  let client;
  if ("client" in clientOptions) {
    client = clientOptions.client;
    log.log("using caller-supplied delivery client");
  } else {
    const { accessToken, previewToken, preview, host } = clientOptions;
    if (preview && !previewToken) {
      throw new Error(
        "fetchFragment() called with preview: true but no previewToken was provided",
      );
    }
    const resolvedHost = host ?? (preview ? PREVIEW_HOST : undefined);
    const token = preview ? previewToken! : accessToken;
    client = createClient({
      accessToken: token,
      host: resolvedHost,
    });
    log.log("created delivery client", { preview: Boolean(preview), host: resolvedHost });
  }

  log.log("fetching experience fragment", {
    spaceId,
    environmentId,
    fragmentId,
    locale,
  });
  const payload = await client.experienceFragment.get(
    spaceId,
    environmentId,
    fragmentId,
    { locale },
  );
  log.lazy("received raw fragment payload", () => payload);

  return resolveExperience(payload as ExperiencePayload, config, {
    metadata,
    debug,
    initialViewportId,
  });
}
