import type { CarnetDayCard } from "../../data/carnets/types";

export type ItineraryTotals = {
  days: number;
  distanceKm: number;
  ascentM: number;
  descentM: number;
};

/**
 * Additionne les stats déjà calculées par jour (elles-mêmes issues de l'analyse
 * GPX réelle — voir data/gpx-sources/). Ne recalcule jamais depuis une trace :
 * ne fait que sommer ce que l'itinéraire structuré contient déjà, pour qu'il
 * n'existe qu'une seule source de vérité entre la carte, les étapes et le hero.
 */
export function computeItineraryTotals(days: CarnetDayCard[]): ItineraryTotals {
  return days.reduce<ItineraryTotals>(
    (acc, d) => ({
      days: acc.days + 1,
      distanceKm: acc.distanceKm + (d.distanceKm ?? 0),
      ascentM: acc.ascentM + (d.ascentM ?? 0),
      descentM: acc.descentM + (d.descentM ?? 0),
    }),
    { days: 0, distanceKm: 0, ascentM: 0, descentM: 0 }
  );
}

export function formatDaysLabel(days: number): string {
  return `${days} jour${days > 1 ? "s" : ""}`;
}

export function formatDistanceKm(km: number): string {
  return `${km.toFixed(1).replace(".", ",")} km`;
}

export function formatAscent(m: number): string {
  return `D+ ${Math.round(m / 10) * 10} m`;
}

export function formatDescent(m: number): string {
  return `D− ${Math.round(m / 10) * 10} m`; // U+2212 signe moins, cohérent avec CarnetItinerary
}

/** Valeur seule (sans préfixe D+/D−) — pour un champ Informations dont le
 *  libellé ("D+", "D−") porte déjà ce sens. */
export function formatMeters(m: number): string {
  return `${Math.round(m / 10) * 10} m`;
}
