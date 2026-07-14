export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="flex flex-col gap-3 border-t border-line py-12 sm:flex-row sm:items-center sm:justify-between">
      <strong>{name.toUpperCase()}</strong>
      <span className="text-muted">Human-centered systems for consequential work.</span>
    </footer>
  );
}
