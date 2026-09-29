import { ServerExperienceRenderer } from "@contentful/experiences-react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { experienceConfig } from "@/lib/experience-config";
import { fetchFragment } from "@/lib/fetch-fragment";
import { isFragmentEntityType } from "@/lib/preview-entity";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ entityType?: string }>;
}) {
  const { locale, id } = await params;
  const { entityType } = await searchParams;
  const { isEnabled: preview } = await draftMode();
  const isFragment = isFragmentEntityType(entityType);

  const debugBar = (
    <div className="flex flex-wrap gap-4 p-2 text-sm bg-blue-300">
      {isFragment ? (
        <>
          <p><b>Entity:</b> Fragment</p>
          <p><b>Fragment ID:</b> {id}</p>
          {entityType ? <p><b>Entity type:</b> {entityType}</p> : null}
        </>
      ) : (
        <p><b>Experience ID:</b> {id}</p>
      )}
      <p><b>Locale:</b> {locale}</p>
      <p><b>Preview:</b> {preview ? "true" : "false"}</p>
    </div>
  );

  if (!isFragment) {
    return (
      <>
        {/* Intentional, always-on learning aid — not scaffolding to remove. Lets
        you see the resolved locale/id/preview values while working through
        the exercises, regardless of draft mode. */}
        {debugBar}
      </>
    );
  }

  const plan = await fetchFragment(
    {
      spaceId: process.env.SPACE_ID!,
      environmentId: process.env.ENVIRONMENT_ID!,
      fragmentId: id,
      locale,
    },
    {
      accessToken: process.env.CDA_TOKEN!,
      previewToken: process.env.CPA_TOKEN,
      preview,
    },
    { config: experienceConfig, debug: preview },
  );

  if (!plan) notFound();

  return (
    <>
      {debugBar}
      <ServerExperienceRenderer
        experience={plan}
        config={experienceConfig}
        debug={preview}
      />
    </>
  );
}
