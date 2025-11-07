"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { useSession } from "@/hooks/useSession";
import { PlusCircle, Trash2 } from "lucide-react";

export default function GratitudeJournal() {
  const session = useSession();
  const user = session?.user;
  const [entries, setEntries] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("gratitude_journal")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setEntries(data || []);
  };

  const handleAdd = async () => {
    if (!newEntry.trim()) return;
    const { error } = await supabase.from("gratitude_journal").insert({
      user_id: user.id,
      content: newEntry,
    });
    if (error) alert("❌ Error al guardar la nota");
    else {
      setNewEntry("");
      fetchEntries();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("gratitude_journal").delete().eq("id", id);
    fetchEntries();
  };

  if (!user)
    return (
      <div className="p-6 text-center text-gray-600">
        🔒 Debes iniciar sesión para escribir en tu diario.
      </div>
    );

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-[#699944] mb-4 text-center">
        📖 Tu Diario de Gratitud
      </h2>

      {/* Área de escritura */}
      <div className="bg-white border border-[#88b863]/30 rounded-2xl shadow-sm p-4 mb-5">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Escribe algo por lo que te sientas agradecido hoy..."
          className="w-full h-32 resize-none outline-none text-gray-700 placeholder:text-gray-400 p-3 rounded-xl"
        />
        <button
          onClick={handleAdd}
          className="mt-3 inline-flex items-center gap-2 bg-[#88b863] hover:bg-[#699944] text-white px-5 py-2 rounded-full transition"
        >
          <PlusCircle className="w-5 h-5" /> Guardar entrada
        </button>
      </div>

      {/* Listado de entradas */}
      <div className="space-y-4">
        {entries.length === 0 && (
          <p className="text-center text-gray-500">
            🌱 Aún no tienes entradas. ¡Comienza a escribir tu gratitud hoy!
          </p>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#f9fdf8] border border-[#88b863]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
              <span>
                {new Date(entry.created_at).toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-[#699944] hover:text-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
