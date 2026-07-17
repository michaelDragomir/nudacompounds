import { ArrowRightIcon } from "./icons";

const phases = [
  "Identity",
  "Purity",
  "Concentration",
  "Sterility",
  "Endotoxins",
  "Heavy Metals",
];

export function Standards() {
  return (
    <section id="standards" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <div className="rounded-2xl bg-navy aspect-[4/3] relative overflow-hidden order-2 md:order-1">
        <div className="absolute inset-0 bg-molecule-grid opacity-50" aria-hidden="true" />
        <div className="absolute bottom-5 left-5 bg-navy-dark/90 text-offwhite text-xs font-semibold px-4 py-2 rounded-lg">
          6-Point Testing Protocol
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-amber" />
          <span className="text-navy text-xs font-bold tracking-[0.2em] uppercase">
            Our Standards
          </span>
        </div>
        <h2 className="text-3xl font-bold text-navy leading-tight">
          Rigorous Testing. No Shortcuts.
        </h2>
        <p className="mt-4 text-charcoal/80 leading-relaxed">
          We don&rsquo;t rely on a single pass or unverified overseas sourcing. Every
          peptide we distribute goes through independent lab verification across six
          points before it ships.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {phases.map((phase) => (
            <div key={phase} className="flex items-center gap-2 text-sm text-charcoal">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              {phase}
            </div>
          ))}
        </div>

        <p className="mt-6 text-charcoal/80 leading-relaxed">
          Every Certificate of Analysis, lot number, and batch record is published
          publicly &mdash; no account or request required.
        </p>

        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-amber-dark transition-colors"
        >
          View Sample COA <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
