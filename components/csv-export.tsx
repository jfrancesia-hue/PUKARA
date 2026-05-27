"use client";

import { Download } from "lucide-react";
import type { Incident } from "@/lib/types";
import { csvEscape } from "@/lib/utils";

export function CsvExport({ incidents }: { incidents: Incident[] }) {
  function download() {
    const rows = [["codigo", "titulo", "categoria", "prioridad", "estado", "jurisdiccion", "creado"], ...incidents.map((i) => [i.code, i.title, i.category, i.priority, i.status, i.jurisdictions?.name ?? "", i.created_at])];
    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pukara-incidentes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  return <button type="button" className="btn-secondary" onClick={download}><Download className="h-4 w-4" /> Exportar CSV</button>;
}
