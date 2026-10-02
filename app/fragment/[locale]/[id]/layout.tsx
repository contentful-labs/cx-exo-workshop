import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";

export default async function FragmentPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <>
      <SiteHeader draftMode={isEnabled} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
