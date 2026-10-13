import type { PortableRenderPlan } from "@contentful/experiences-sdk-core";

/**
 * Strip resolve-time `Error` diagnostics before passing a plan from a Server
 * Component to a Client Component. The SDK documents that diagnostics do not
 * survive serialization; the client renderer collects fresh render-time ones.
 */
export function planForClient(plan: PortableRenderPlan): PortableRenderPlan {
  return {
    ...plan,
    diagnostics: [],
  };
}
