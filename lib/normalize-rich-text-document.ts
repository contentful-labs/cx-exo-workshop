import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

function parseJsonIfString(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function asDocument(value: unknown): Document | null {
  if (typeof value !== "object" || value === null) return null;
  const node = value as Document;
  if (node.nodeType !== BLOCKS.DOCUMENT) return null;
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: node.data ?? {},
    content: Array.isArray(node.content) ? node.content : [],
  };
}

/**
 * Coerce ExO / binding payloads into a shape `documentToReactComponents` accepts.
 * Handles JSON strings, `{ document: … }` wrappers, and missing `content` arrays.
 */
export function normalizeRichTextDocument(input: unknown): Document | null {
  let value = parseJsonIfString(input);
  if (value == null) return null;

  value = parseJsonIfString(
    typeof value === "object" &&
      value !== null &&
      "document" in value &&
      (value as { document?: unknown }).document != null
      ? (value as { document: unknown }).document
      : value,
  );
  if (value == null) return null;

  return asDocument(value);
}
