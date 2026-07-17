import { ShieldIcon, CheckBadgeIcon, DocumentIcon, TruckIcon, PeopleIcon } from "./icons";

const items = [
  { icon: ShieldIcon, label: "cGMP-Aligned Facilities" },
  { icon: CheckBadgeIcon, label: "Third-Party Verified" },
  { icon: DocumentIcon, label: "Public COA Database" },
  { icon: TruckIcon, label: "Fast, Discreet Shipping" },
  { icon: PeopleIcon, label: "Independently Owned" },
];

export function TrustStrip() {
  return (
    <div className="bg-navy-light">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-offwhite/85 text-sm font-medium">
            <Icon className="w-4 h-4 text-amber" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
