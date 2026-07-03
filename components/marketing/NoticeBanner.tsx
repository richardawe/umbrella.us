export function NoticeBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-clay/30 bg-clay/10 px-5 py-4 text-sm leading-relaxed text-ink">
      {children}
    </div>
  );
}
