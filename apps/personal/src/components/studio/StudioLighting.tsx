export function StudioLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="studio-light-day absolute inset-0 transition-opacity duration-700" />
      <div className="studio-light-night absolute inset-0 transition-opacity duration-700" />
    </div>
  );
}
