import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { fixDraftBypassCookieForIframe } from "@/lib/fix-draft-bypass-cookie";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const locale = searchParams.get("locale");
  const experienceId = searchParams.get("id");
  const entityId = searchParams.get("entityId");
  const entityType = searchParams.get("entityType");

  if (secret !== process.env.DRAFT_MODE_SECRET || !locale) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  await fixDraftBypassCookieForIframe();

  if (experienceId) {
    redirect(`/${locale}/${experienceId}`);
  }

  if (entityId && entityType) {
    redirect(`/fragment/${locale}/${entityId}`);
  }

  return new Response("Invalid token", { status: 401 });
}
