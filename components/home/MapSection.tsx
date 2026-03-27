import { company } from "@/data/company";

export function MapSection() {
  return (
    <div className="relative h-72 sm:h-96 bg-charcoal w-full overflow-hidden">
      {/* Map embed */}
      <iframe
        src={company.mapsEmbedUrl}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Al Kawther Location Map"
        aria-label="Map showing Al Kawther location"
      />

      {/* Overlay card */}
      <div className="absolute top-4 left-4 bg-white shadow-card p-4 z-10 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
            <span className="text-ink text-[8px] font-bold">AK</span>
          </div>
          <span className="text-xs font-bold text-ink">Al Kawther</span>
        </div>
        <p className="text-xs text-warm-gray leading-relaxed">{company.address.full}</p>
        <a
          href={company.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs font-bold text-gold hover:underline"
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
}
