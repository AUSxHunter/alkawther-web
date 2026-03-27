import { company } from "@/data/company";

const stats = [
  { value: company.stats.yearsExperience, label: "Years of Experience", description: "Serving the UAE construction industry" },
  { value: company.stats.productLines, label: "Product Lines", description: "Across 14 categories" },
  { value: company.stats.trustedBrands, label: "Trusted Brands", description: "Sourced from leading suppliers" },
  { value: company.stats.projectsServed, label: "Projects Served", description: "Residential and commercial" },
  { value: company.stats.teamSize, label: "Team Members", description: "Dedicated to your project" },
];

export function StatsRibbon() {
  return (
    <section
      className="bg-ink border-y border-gold/10 py-14"
      aria-label="Company statistics"
    >
      {/* Gold accent top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gold/30" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans">
              Al Kawther By The Numbers
            </span>
            <div className="h-px w-16 bg-gold/30" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center flex flex-col items-center gap-2 px-4"
            >
              <span
                className="font-display font-bold text-gold"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {stat.value}
              </span>
              <span className="text-white font-semibold text-sm font-sans">
                {stat.label}
              </span>
              <span className="text-warm-gray text-xs leading-relaxed font-sans">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
