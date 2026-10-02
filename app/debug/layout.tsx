export default function DebugLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#272822] text-[#f8f8f2] font-mono text-sm">
      {children}
    </div>
  );
}
