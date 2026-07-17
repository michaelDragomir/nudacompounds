import {
  ShieldIcon,
  DocumentIcon,
  TruckIcon,
  ClockIcon,
  PeopleIcon,
  CheckBadgeIcon,
} from "./icons";

const features = [
  {
    icon: ShieldIcon,
    title: "USA-Sourced Materials",
    body: "Every compound is sourced from domestic facilities. No overseas shortcuts, no unverified middlemen.",
  },
  {
    icon: DocumentIcon,
    title: "Full Batch Transparency",
    body: "A public COA database with lot numbers and batch-level documentation, available for every product.",
  },
  {
    icon: TruckIcon,
    title: "Fast, Discreet Shipping",
    body: "Orders placed before cutoff ship the same day, packaged discreetly with tracking every step of the way.",
  },
  {
    icon: ClockIcon,
    title: "A Partner You Can Reach",
    body: "Questions get answered by someone who actually understands the research, not a support queue.",
  },
  {
    icon: PeopleIcon,
    title: "Independently Owned",
    body: "A small, accountable team — not a faceless marketplace. When you reach out, a real person responds.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Responsible Sourcing",
    body: "Internal review protocols built to support structured, repeatable research environments.",
  },
];

export function FeatureGrid() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-amber" />
          <span className="text-navy text-xs font-bold tracking-[0.2em] uppercase">
            About Nuda
          </span>
        </div>
        <h2 className="text-3xl font-bold text-navy leading-tight">
          A Dedicated Partner to the Research Community
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-black/5 bg-white/60 p-6 hover:border-amber/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-navy mb-4">
              <Icon />
            </div>
            <h3 className="font-bold text-navy">{title}</h3>
            <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
