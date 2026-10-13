"use client";

import { ClientExperienceRenderer } from "@contentful/experiences-react";
import type { PortableRenderPlan } from "@contentful/experiences-sdk-core";
import { experienceConfig } from "@/lib/experience-config";

type ExperienceViewProps = {
  experience: PortableRenderPlan;
  debug?: boolean;
};

export function ExperienceView({ experience, debug }: ExperienceViewProps) {
  return (
    <ClientExperienceRenderer
      experience={experience}
      config={experienceConfig}
      debug={debug}
    />
  );
}
