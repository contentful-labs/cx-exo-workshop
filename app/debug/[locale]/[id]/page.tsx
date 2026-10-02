import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { fetchXdaExperience } from "@/lib/fetch-xda-experience";
import { fetchXdaFragment } from "@/lib/fetch-xda-fragment";
import { isFragmentEntityType } from "@/lib/preview-entity";

export default async function XdaDebugPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ entityType?: string }>;
}) {
  const { locale, id } = await params;
  const { entityType } = await searchParams;
  const { isEnabled: draftModeEnabled } = await draftMode();
  const fragment = isFragmentEntityType(entityType);

  // Debug preview always hits the XDN Preview API (CPA + preview host + preview=true).
  const clientOptions = {
    accessToken: process.env.CDA_TOKEN!,
    previewToken: process.env.CPA_TOKEN,
    preview: true,
  };

  const raw = fragment
    ? await fetchXdaFragment(
        {
          spaceId: process.env.SPACE_ID!,
          environmentId: process.env.ENVIRONMENT_ID!,
          fragmentId: id,
          locale,
        },
        clientOptions,
      )
    : await fetchXdaExperience(
        {
          spaceId: process.env.SPACE_ID!,
          environmentId: process.env.ENVIRONMENT_ID!,
          experienceId: id,
          locale,
        },
        clientOptions,
      );

  if (!raw) notFound();

  const json = JSON.stringify(raw, null, 2);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-900 px-4 py-2 text-xs text-neutral-400">
        <p>
          <span className="text-neutral-200">Preview API raw response</span>
          {" · "}
          {fragment ? "Experience fragment" : "Experience"}
          {" · "}
          id={id}
          {" · "}
          locale={locale}
          {" · "}
          draftMode={draftModeEnabled ? "true" : "false"}
          {" · "}
          previewApi=true
          {entityType ? ` · entityType=${entityType}` : null}
        </p>
      </header>
      <pre className="overflow-auto p-4 whitespace-pre-wrap break-words">{json}</pre>
    </>
  );
}
