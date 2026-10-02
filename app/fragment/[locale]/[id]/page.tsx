import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { ServerExperienceRenderer } from "@contentful/experiences-react";
import { experienceConfig } from "@/lib/experience-config";
import { fetchFragment } from "@/lib/fetch-fragment";

/**
 * Component (fragment) Content Preview — pre-wired for the workshop.
 * Attendees implement experience preview on `app/[locale]/[id]/page.tsx` instead.
 */
export default async function FragmentPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const { isEnabled: preview } = await draftMode();

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
