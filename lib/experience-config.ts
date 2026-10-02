import type { Config } from "@contentful/experiences-react";
import { resolveDesignToken } from "@/lib/design-tokens";

/**
 * Workshop step 3: register `Button`, `Text`, `Flex`, and `Image` in
 * `components` (see README cheatsheet). Used by the pre-wired fragment preview
 * route and by `fetchExperience` / `ServerExperienceRenderer` on the experience
 * page once you add them in step 3.
 */
export const experienceConfig: Config = {
  components: {},
  resolveToken: resolveDesignToken,
};
