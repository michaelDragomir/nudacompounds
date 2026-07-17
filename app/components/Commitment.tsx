export function Commitment() {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-molecule-grid opacity-30" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-amber" />
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase">
            Our Commitment
          </span>
        </div>

        <h2 className="text-3xl font-bold text-offwhite leading-tight">
          Research Use Only, Always
        </h2>

        <p className="mt-5 text-offwhite/70 leading-relaxed">
          Every product Nuda Compounds distributes is intended strictly for laboratory
          research. We hold ourselves to a standard of responsible sourcing and full
          documentation, so the researchers who rely on us always know exactly what
          they&rsquo;re getting.
        </p>
        <p className="mt-4 text-offwhite/70 leading-relaxed">
          Customers are responsible for ensuring compliance with applicable
          regulations in their own jurisdiction.
        </p>

        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-navy-dark font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          Contact Our Team
        </a>

        <div className="mt-10 rounded-xl border border-offwhite/15 bg-offwhite/5 px-6 py-4 text-xs text-offwhite/60 leading-relaxed">
          All products offered are intended strictly for in-vitro research use within
          controlled laboratory settings. Not intended for human consumption,
          veterinary use, or therapeutic application.
        </div>
      </div>
    </section>
  );
}
