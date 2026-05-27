"use client";

import { useMemo } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { Incident, TrafficEvent, Unit } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

function color(priority: string) {
  if (priority === "critica") return "#D94141";
  if (priority === "alta") return "#F2B84B";
  if (priority === "media") return "#18B7A4";
  return "#E7D3B0";
}

export default function OperationalMap({ incidents, units, traffic, height = 560 }: { incidents: Incident[]; units: Unit[]; traffic: TrafficEvent[]; height?: number }) {
  const center = useMemo<[number, number]>(() => {
    const point = incidents.find((i) => i.lat && i.lng) ?? traffic.find((t) => t.lat && t.lng);
    return point?.lat && point?.lng ? [point.lat, point.lng] : [-28.4696, -65.7795];
  }, [incidents, traffic]);

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 shadow-glow" style={{ height }}>
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {incidents.filter((i) => i.lat && i.lng).map((incident) => (
          <CircleMarker key={incident.id} center={[incident.lat!, incident.lng!]} radius={incident.priority === "critica" ? 14 : 10} pathOptions={{ color: color(incident.priority), fillColor: color(incident.priority), fillOpacity: .46, weight: 2 }}>
            <Popup>
              <div className="min-w-56 text-night"><b>{incident.code}</b><p>{incident.title}</p><StatusBadge value={incident.priority} kind="priority" /></div>
            </Popup>
          </CircleMarker>
        ))}
        {units.filter((u) => u.current_lat && u.current_lng).map((unit) => (
          <CircleMarker key={unit.id} center={[unit.current_lat!, unit.current_lng!]} radius={8} pathOptions={{ color: "#18B7A4", fillColor: "#123C2F", fillOpacity: .85, weight: 2 }}>
            <Popup><div className="text-night"><b>{unit.code}</b><p>{unit.name} · {unit.status}</p></div></Popup>
          </CircleMarker>
        ))}
        {traffic.filter((t) => t.lat && t.lng).map((event) => (
          <CircleMarker key={event.id} center={[event.lat!, event.lng!]} radius={9} pathOptions={{ color: "#C8783A", fillColor: "#C8783A", fillOpacity: .38, weight: 2 }}>
            <Popup><div className="text-night"><b>{event.title}</b><p>{event.type} · {event.status}</p></div></Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
