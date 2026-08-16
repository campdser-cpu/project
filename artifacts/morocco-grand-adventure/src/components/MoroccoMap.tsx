import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getLocalizedDestinations, categoryLabel } from '@/i18n/content';
import { Link } from 'wouter';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CATEGORY_COLORS: Record<string, string> = {
  'Imperial Cities': '#8B5CF6',
  'Sahara Desert': '#F59E0B',
  'Mountains': '#10B981',
  'Beaches': '#3B82F6',
  'Northern Morocco': '#EF4444',
  'Oases & Valleys': '#06B6D4',
};

/**
 * Optional route: draw a polyline connecting an ordered list of destination ids.
 * Used on tour pages to show the driving route.
 */
export function MoroccoMap({ routeIds, height = 520 }: { routeIds?: string[]; height?: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { lang, t } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const routeDests = routeIds
      ? (routeIds.map(id => destinations.find(d => d.id === id)).filter(Boolean) as typeof destinations)
      : [];
    const markerDests = routeIds ? routeDests : destinations;

    const map = L.map(mapRef.current, {
      center: routeIds ? [31.3, -6.0] : [31.5, -6.2],
      zoom: routeIds ? 6 : 5,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    markerDests.forEach((dest, idx) => {
      if (!dest.coords) return;
      const colour = routeIds ? '#C9A84C' : (CATEGORY_COLORS[dest.category] || '#C9A84C');
      const label = routeIds ? `<div style="position:absolute;top:-9px;left:-9px;width:22px;height:22px;line-height:22px;text-align:center;color:#fff;font-size:11px;font-weight:bold">${idx + 1}</div>` : '';
      const size = routeIds ? 22 : 13;
      const icon = L.divIcon({
        html: `<div style="width:${size}px;height:${size}px;background:${colour};border:2px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);position:relative">${label}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        className: '',
      });

      const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest.coords.lat},${dest.coords.lng}`;
      const popupHtml = `
        <div style="font-family:Georgia,serif;text-align:center;padding:4px;min-width:170px">
          <div style="font-size:13px;font-weight:bold;color:#1a1a1a;margin-bottom:2px">${routeIds ? `Stop ${idx + 1}: ` : ''}${dest.name}</div>
          <div style="font-size:10px;color:#999;margin-bottom:6px">${categoryLabel(dest.category, lang)}</div>
          <div style="font-size:11px;color:#555;margin-bottom:8px;line-height:1.4">${dest.shortDesc.slice(0, 75)}…</div>
          <a href="${base}/${lang}/destinations/${dest.id}" style="display:inline-block;background:#C9A84C;color:#fff;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:bold;text-decoration:none;margin-right:4px">${t('explore')}</a>
          <a href="${gmapsUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#1a1a1a;color:#fff;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:bold;text-decoration:none">${t('map_directions')}</a>
        </div>`;

      L.marker([dest.coords.lat, dest.coords.lng], { icon })
        .addTo(map)
        .bindPopup(popupHtml, { maxWidth: 240 });
    });

    // Draw the route polyline for tour pages
    if (routeIds && routeDests.length > 1) {
      const latlngs = routeDests
        .filter(d => d.coords)
        .map(d => [d.coords.lat, d.coords.lng] as [number, number]);
      L.polyline(latlngs, {
        color: '#C9A84C',
        weight: 3,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);
      map.fitBounds(L.latLngBounds(latlngs).pad(0.2));
    }

    mapInstanceRef.current = map;
    // Fix tiles not rendering when container animates in
    setTimeout(() => map.invalidateSize(), 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
      {/* Legend — only on full map */}
      {!routeIds && (
        <div className="absolute top-4 right-4 z-[500] bg-background/95 backdrop-blur rounded-xl p-3 shadow-lg border border-border text-xs space-y-1.5 hidden sm:block">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-white/40 shrink-0" style={{ background: color }} />
              <span className="text-foreground font-medium whitespace-nowrap">{categoryLabel(cat, lang)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Quick-link city strip — only on full map */}
      {!routeIds && (
        <div className="absolute bottom-0 left-0 right-0 z-[500] bg-background/90 backdrop-blur-md border-t border-border px-4 py-3 flex gap-4 overflow-x-auto">
          {['marrakech', 'fes', 'merzouga', 'chefchaouen', 'essaouira', 'dades-valley', 'ait-ben-haddou', 'ouarzazate'].map(id => {
            const dest = destinations.find(d => d.id === id);
            if (!dest) return null;
            return (
              <Link key={id} href={`/destinations/${id}`}
                className="flex items-center gap-1 text-xs font-bold text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {dest.name}
              </Link>
            );
          })}
        </div>
      )}

      <div ref={mapRef} style={{ height: `${height}px`, width: '100%', zIndex: 0 }} />
    </div>
  );
}
