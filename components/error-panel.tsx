export function ErrorPanel({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <div className="mb-5 rounded-3xl border border-alert/30 bg-alert/10 p-4 text-sm text-red-100">
      <p className="font-bold">Supabase reporto errores. Verificar que la migracion este aplicada.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">{errors.map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>
    </div>
  );
}
