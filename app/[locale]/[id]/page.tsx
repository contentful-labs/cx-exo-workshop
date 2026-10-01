import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { fetchExperience, ServerExperienceRenderer } from "@contentful/experiences-react";
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

  if (isFragmentEntityType(entityType)) {
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
        <div className="flex flex-wrap gap-4 p-2 text-sm bg-blue-300">
          <p><b>Entity:</b> Fragment</p>
          <p><b>Fragment ID:</b> {id}</p>
          <p><b>Entity type:</b> {entityType}</p>
          <p><b>Locale:</b> {locale}</p>
          <p><b>Preview:</b> {preview ? "true" : "false"}</p>
        </div>
        <ServerExperienceRenderer
          experience={plan}
          config={experienceConfig}
          debug={preview}
        />
      </>
    );
  }

  // The whole pipeline in one call: where to fetch from (space/environment/
  // experience/locale), how to authenticate (CDA token normally, CPA token
  // when draft mode is on — `preview` picks which), and how to render
  // (component registry + token resolver from experienceConfig). Env vars
  // are asserted non-null here on the assumption `.env.local` is filled in
  // per the README/TRAINING setup steps — see .env.example.
  const experience = await fetchExperience(
    {
      spaceId: process.env.SPACE_ID!,
      environmentId: process.env.ENVIRONMENT_ID!,
      experienceId: id,
      locale,
    },
    {
      accessToken: process.env.CDA_TOKEN!,
      previewToken: process.env.CPA_TOKEN,
      preview,
    },
    { config: experienceConfig, debug: preview },
  );

  if (!experience) notFound();

  return (
    <>
      <div className="flex flex-wrap gap-4 p-2 text-sm bg-blue-300">
        <p><b>Experience ID:</b> {id}</p>
        <p><b>Locale:</b> {locale}</p>
        <p><b>Preview:</b> {preview ? "true" : "false"}</p>
      </div>
      <ServerExperienceRenderer
        experience={experience}
        config={experienceConfig}
        debug={preview}
      />
    </>
  );
}
