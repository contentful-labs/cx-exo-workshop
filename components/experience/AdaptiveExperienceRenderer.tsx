import {
  ServerExperienceRenderer,
  type PortableRenderPlan,
} from "@contentful/experiences-react";
import { ExperienceView } from "@/components/experience/ExperienceView";
import { experienceConfig } from "@/lib/experience-config";
import { planForClient } from "@/lib/plan-for-client";

type AdaptiveExperienceRendererProps = {
  experience: PortableRenderPlan;
  /** Draft Mode / CPA preview — use the client renderer (debug + RSC-safe). */
  preview: boolean;
};

/**
 * Published: server renderer. Preview: client renderer so debug output and
 * resolve-time diagnostics do not cross the RSC boundary.
 */
export function AdaptiveExperienceRenderer({
  experience,
  preview,
}: AdaptiveExperienceRendererProps) {
  if (preview) {
    return (
      <ExperienceView experience={planForClient(experience)} debug />
    );
  }

  return (
    <ServerExperienceRenderer
      experience={experience}
      config={experienceConfig}
      debug={false}
    />
  );
}
