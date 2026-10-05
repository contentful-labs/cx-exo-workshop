import type { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { MARKS } from "@contentful/rich-text-types";
import { resolveColor, textSize } from "@/lib/design-tokens";

const renderMark = {
  [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
  [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
  [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
  [MARKS.CODE]: (text: ReactNode) => (
    <code
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "0.9em",
      }}
    >
      {text}
    </code>
  ),
  [MARKS.SUPERSCRIPT]: (text: ReactNode) => <sup>{text}</sup>,
  [MARKS.SUBSCRIPT]: (text: ReactNode) => <sub>{text}</sub>,
  [MARKS.STRIKETHROUGH]: (text: ReactNode) => <s>{text}</s>,
};

export function RichText({
  document,
  size,
  color,
}: {
  document?: Document | null;
  size?: string;
  color?: string;
}) {
  if (!document) return null;

  return (
    <div
      style={{
        fontSize: textSize(size),
        color: resolveColor(color),
        lineHeight: 1.6,
      }}
    >
      {documentToReactComponents(document, { renderMark })}
    </div>
  );
}
