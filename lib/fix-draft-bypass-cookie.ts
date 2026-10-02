import { cookies } from "next/headers";

/**
 * Next sets __prerender_bypass without SameSite=None, so browsers drop it in a
 * cross-site iframe (e.g. the Contentful preview embed).
 * https://github.com/vercel/next.js/issues/49927
 */
export async function fixDraftBypassCookieForIframe() {
  const cookieStore = await cookies();
  const bypassCookie = cookieStore.get("__prerender_bypass");
  if (bypassCookie) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: bypassCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }
}
