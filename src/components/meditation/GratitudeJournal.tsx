"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { useSession } from "@/hooks/useSession";
import { PlusCircle, Trash2, Pencil, Check, X } from "lucide-react";

type Entry = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function GratitudeJournal() {
  const session = useSession();
  const user = session?.user;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

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
    if (!error) setEntries((data as Entry[]) || []);
  };

  const addEntry = async () => {
    if (!newEntry.trim() || !user) return;
    const { error } = await supabase.from("gratitude_journal").insert({
      user_id: user.id,
      content: newEntry.trim(),
    });
    if (!error) {
      setNewEntry("");
      fetchEntries();
    } else {
      alert("❌ Error al guardar la nota");
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from("gratitude_journal").delete().eq("id", id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditingContent(entry.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEdit = async () => {
    if (!editingId || !editingContent.trim()) return;
    const { error } = await supabase
      .from("gratitude_journal")
      .update({ content: editingContent.trim() })
      .eq("id", editingId);
    if (!error) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId ? { ...e, content: editingContent } : e
        )
      );
      cancelEdit();
    } else {
      alert("❌ No se pudo actualizar");
    }
  };

  if (!user)
    return (
      <div className="p-6 text-center text-gray-600">
        🔒 Debes iniciar sesión para escribir en tu diario.
      </div>
    );

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-[#699944] mb-4 text-center">
        📖 Tu Diario de Gratitud
      </h2>

      {/* Editor nuevo */}
      <div className="bg-white border border-[#88b863]/30 rounded-2xl shadow-sm p-4 mb-6">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Escribe por lo que te sientes agradecido hoy…"
          className="w-full h-32 resize-none outline-none text-gray-700 placeholder:text-gray-400 p-3 rounded-xl"
        />
        <div className="flex justify-end">
          <button
            onClick={addEntry}
            className="mt-3 inline-flex items-center gap-2 bg-[#88b863] hover:bg-[#699944] text-white px-5 py-2 rounded-full transition"
          >
            <PlusCircle className="w-5 h-5" /> Guardar entrada
          </button>
        </div>
      </div>

      {/* Entradas */}
      <div className="space-y-4">
        {entries.length === 0 && (
          <p className="text-center text-gray-500">
            🌱 Aún no tienes entradas. ¡Comienza hoy!
          </p>
        )}

        {entries.map((entry) => {
          const date = new Date(entry.created_at);
          return (
            <div
              key={entry.id}
              className="bg-[#f9fdf8] border border-[#88b863]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {editingId === entry.id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full h-28 resize-none outline-none text-gray-700 p-3 rounded-xl bg-white border border-[#88b863]/30"
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={saveEdit}
                      className="inline-flex items-center gap-2 bg-[#88b863] hover:bg-[#699944] text-white px-4 py-2 rounded-full transition"
                    >
                      <Check className="w-4 h-4" /> Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full transition"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 whitespace-pre-line">
                    {entry.content}
                  </p>
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <span>
                      {date.toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => startEdit(entry)}
                        className="text-[#699944] hover:opacity-80 transition inline-flex items-center gap-1"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" /> Editar
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-[#d94c4c] hover:opacity-80 transition inline-flex items-center gap-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" /> Eliminar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
