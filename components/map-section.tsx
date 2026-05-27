"use client";

import dynamic from "next/dynamic";
import type { Incident, TrafficEvent, Unit } from "@/lib/types";

const OperationalMap = dynamic(() => import("@/components/operational-map"), { ssr: false, loading: () => <div className="grid h-[560px] place-items-center rounded-[1.6rem] border border-white/10 bg-white/[0.04] text-arena/60">Cargando mapa operativo...</div> });

export function MapSection(props: { incidents: Incident[]; units: Unit[]; traffic: TrafficEvent[]; height?: number }) {
  return <OperationalMap {...props} />;
}
