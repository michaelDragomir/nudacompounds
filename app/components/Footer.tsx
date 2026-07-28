export function Footer() {
  return (
    <footer className="bg-navy-dark text-offwhite/70 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-amber font-bold text-sm">
            N
          </span>
          <span className="font-bold tracking-tight text-offwhite text-lg">
            NUDA <span className="font-normal text-offwhite/60">Compounds</span>
          </span>
        </div>

        <p className="text-sm">
          Questions about an order or a batch?{" "}
          <a href="mailto:hello@nudacompounds.com" className="text-amber hover:underline">
            hello@nudacompounds.com
          </a>
        </p>

        <p className="max-w-2xl mx-auto text-xs leading-relaxed mt-8 text-offwhite/50">
          All products offered by Nuda Compounds are intended strictly for in-vitro
          research use within controlled laboratory settings. Not intended for human
          consumption, veterinary use, or therapeutic application. Customers are
          solely responsible for ensuring compliance with applicable local, state,
          and federal regulations.
        </p>

        <p className="text-xs text-offwhite/40 mt-6">
          &copy; 2026 Nuda Compounds. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
