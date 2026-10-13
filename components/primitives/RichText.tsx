import type { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Block, Document, Inline } from "@contentful/rich-text-types";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { resolveColor, textSize } from "@/lib/design-tokens";
import { normalizeRichTextDocument } from "@/lib/normalize-rich-text-document";

const headingStyle = {
  margin: "0.75em 0 0.35em",
  fontWeight: 600,
  lineHeight: 1.25,
} as const;

const embeddedPlaceholderBlockStyle = {
  margin: "0.75em 0",
  padding: "0.5em 0.75em",
  border: "1px dashed currentColor",
  borderRadius: "4px",
  fontSize: "0.875em",
  opacity: 0.85,
} as const;

const embeddedPlaceholderInlineStyle = {
  padding: "0.1em 0.35em",
  border: "1px dashed currentColor",
  borderRadius: "3px",
  fontSize: "0.875em",
  opacity: 0.85,
} as const;

function entryIdFromEmbeddedTarget(target: unknown): string | null {
  if (typeof target !== "object" || target === null) return null;
  const id = (target as { sys?: { id?: unknown } }).sys?.id;
  return typeof id === "string" && id.length > 0 ? id : null;
}

function embeddedEntryPlaceholder(node: Block | Inline, block: boolean) {
  const id = entryIdFromEmbeddedTarget(node.data?.target);
  const label = id ?? "unknown entry id";
  if (block) {
    return (
      <div role="note" style={embeddedPlaceholderBlockStyle}>
        Embedded entry: <code>{label}</code>
      </div>
    );
  }
  return (
    <span role="note" style={embeddedPlaceholderInlineStyle}>
      Embedded entry: <code>{label}</code>
    </span>
  );
}

const renderNode = {
  [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
    <h1 style={{ ...headingStyle, fontSize: "2em" }}>{children}</h1>
  ),
  [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
    <h2 style={{ ...headingStyle, fontSize: "1.5em" }}>{children}</h2>
  ),
  [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
    <h3 style={{ ...headingStyle, fontSize: "1.25em" }}>{children}</h3>
  ),
  [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
    <h4 style={{ ...headingStyle, fontSize: "1.1em" }}>{children}</h4>
  ),
  [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => (
    <h5 style={{ ...headingStyle, fontSize: "1em" }}>{children}</h5>
  ),
  [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => (
    <h6 style={{ ...headingStyle, fontSize: "0.9em" }}>{children}</h6>
  ),
  [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
    <blockquote
      style={{
        margin: "0.75em 0",
        paddingLeft: "1em",
        borderLeft: "3px solid currentColor",
        opacity: 0.9,
      }}
    >
      {children}
    </blockquote>
  ),
  [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) =>
    embeddedEntryPlaceholder(node, true),
  [INLINES.EMBEDDED_ENTRY]: (node: Block | Inline) =>
    embeddedEntryPlaceholder(node, false),
};

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
  document?: Document | string | Record<string, unknown> | null;
  size?: string;
  color?: string;
}) {
  const richText = normalizeRichTextDocument(document);
  if (!richText) return null;

  return (
    <div
      style={{
        fontSize: textSize(size),
        color: resolveColor(color),
        lineHeight: 1.6,
      }}
    >
      {documentToReactComponents(richText, { renderMark, renderNode })}
    </div>
  );
}
