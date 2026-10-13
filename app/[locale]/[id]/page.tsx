import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { fetchExperience, NotFoundError } from "@contentful/experiences-react";
import { AdaptiveExperienceRenderer } from "@/components/experience/AdaptiveExperienceRenderer";
import { experienceConfig } from "@/lib/experience-config";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const { isEnabled: preview } = await draftMode();

  let experience;
  try {
    experience = await fetchExperience(
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
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }

  if (!experience) notFound();

  return (
    <>
      <div className="flex flex-wrap gap-4 p-2 text-sm bg-blue-300">
        <p><b>Experience ID:</b> {id}</p>
        <p><b>Locale:</b> {locale}</p>
        <p><b>Preview:</b> {preview ? "true" : "false"}</p>
      </div>
      <AdaptiveExperienceRenderer experience={experience} preview={preview} />
    </>
  );
}
