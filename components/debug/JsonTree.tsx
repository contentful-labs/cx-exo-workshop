"use client";

import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";

type JsonTreeProps = {
  value: object;
};

/**
 * Collapsible, syntax-colored JSON for the facilitator debug preview (client-only).
 */
export function JsonTree({ value }: JsonTreeProps) {
  return (
    <div className="overflow-auto p-4 text-[15px] leading-relaxed">
      <JsonView
        value={value}
        style={{
          ...darkTheme,
          backgroundColor: "transparent",
          fontSize: "15px",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        }}
        collapsed={2}
        displayObjectSize
        displayDataTypes={false}
        enableClipboard
        highlightUpdates={false}
      />
    </div>
  );
}
