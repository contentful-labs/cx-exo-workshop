export default function DebugLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono text-sm">
      {children}
    </div>
  );
}
