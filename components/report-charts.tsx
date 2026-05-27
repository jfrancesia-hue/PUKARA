"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Incident } from "@/lib/types";

export function ReportCharts({ incidents }: { incidents: Incident[] }) {
  const byCategory = Object.entries(incidents.reduce<Record<string, number>>((acc, incident) => { acc[incident.category] = (acc[incident.category] ?? 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const byStatus = Object.entries(incidents.reduce<Record<string, number>>((acc, incident) => { acc[incident.status] = (acc[incident.status] ?? 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const colors = ["#18B7A4", "#C8783A", "#F2B84B", "#D94141", "#1F6B4A", "#E7D3B0"];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="glass-panel rounded-3xl p-5"><h3 className="mb-4 text-lg font-black text-white">Incidentes por categoria</h3><ResponsiveContainer width="100%" height={300}><BarChart data={byCategory}><CartesianGrid stroke="rgba(255,255,255,.08)" /><XAxis dataKey="name" stroke="#E7D3B0" /><YAxis stroke="#E7D3B0" /><Tooltip contentStyle={{ background: "#071A2C", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16 }} /><Bar dataKey="value" fill="#18B7A4" radius={[12, 12, 0, 0]} /></BarChart></ResponsiveContainer></div>
      <div className="glass-panel rounded-3xl p-5"><h3 className="mb-4 text-lg font-black text-white">Estados operativos</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={4}>{byStatus.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie><Tooltip contentStyle={{ background: "#071A2C", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16 }} /></PieChart></ResponsiveContainer></div>
    </div>
  );
}
