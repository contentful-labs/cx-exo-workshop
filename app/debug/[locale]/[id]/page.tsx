import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { JsonTree } from "@/components/debug/JsonTree";
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

  const value = JSON.parse(JSON.stringify(raw)) as object;

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-[#3e3d32] bg-[#1e1f1c] px-4 py-2 text-xs text-[#a9aea6]">
        <p>
          <span className="text-[#f8f8f2]">Preview API raw response</span>
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
      <JsonTree value={value} />
    </>
  );
}
