const links = [
  { href: "#game?app=work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#game?app=work-map", label: "Mind Map" },
  { href: "#resume", label: "Résumé" },
  { href: "#contact", label: "Contact" },
];

export function NavBar({ name }: { name: string }) {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/90 pb-4 pt-2 backdrop-blur-md">
      <div className="text-sm font-extrabold tracking-[0.04em] sm:text-base">
        {name.toUpperCase()}
      </div>
      <div className="flex flex-wrap justify-end gap-3 text-xs sm:gap-6 sm:text-sm">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-70"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
