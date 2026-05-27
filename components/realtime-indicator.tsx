"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function RealtimeIndicator() {
  const [status, setStatus] = useState("conectando");
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("public:incidents")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => {
        setStatus("actualizado");
        setTimeout(() => setStatus("en vivo"), 1200);
      })
      .subscribe((value) => setStatus(value === "SUBSCRIBED" ? "en vivo" : "conectando"));
    return () => { void supabase.removeChannel(channel); };
  }, []);
  return <div className="inline-flex items-center gap-2 rounded-full border border-techno/25 bg-techno/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-techno"><Radio className="h-3 w-3" /> {status}</div>;
}
