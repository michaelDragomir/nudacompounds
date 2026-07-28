export function Story() {
  return (
    <section id="story" className="max-w-6xl mx-auto px-6 py-24">
      <div className="rounded-2xl bg-navy aspect-[21/9] relative overflow-hidden mb-14">
        <div className="absolute inset-0 bg-molecule-grid opacity-40" aria-hidden="true" />
        <div className="absolute bottom-6 left-6 bg-navy-dark/90 text-offwhite text-xs font-semibold px-4 py-2 rounded-lg">
          Founder-Led &bull; Since Day One
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-amber" />
          <span className="text-navy text-xs font-bold tracking-[0.2em] uppercase">
            Our Story
          </span>
        </div>
        <h2 className="text-3xl font-bold text-navy leading-tight">
          Built on Trust. Proven by Science.
        </h2>
        <p className="mt-5 text-charcoal/80 leading-relaxed">
          Nuda Compounds started with a simple frustration: it was too hard to know
          what you were actually getting. We set out to give researchers access to
          verified peptides with the transparency and accountability they deserve.
        </p>
        <p className="mt-4 text-charcoal/80 leading-relaxed">
          We operate with the mindset of a scientist &mdash; rigorous, precise, and
          accountable at every step. That&rsquo;s why every batch is independently
          verified before it ever reaches your lab, and why you can always reach an
          actual person if something doesn&rsquo;t look right.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-offwhite font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
