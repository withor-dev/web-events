"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import { isAxiosError } from "axios";

interface EventFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
    date: string;
  };
}

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
      };

      if (isEditing && initialData) {
        await api.put(`/events/${initialData.id}`, payload);
        router.push(`/eventos/${initialData.id}`);
      } else {
        await api.post("/events", payload);
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Erro ao processar o evento.");
      } else {
        setError("Ocorreu um erro inesperado. Verifique sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Nome do Evento
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Ex: Workshop de Investimentos"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Descrição
        </label>
        <textarea
          id="description"
          required
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Descreva sobre o que será o evento..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Data e Hora
        </label>
        <input
          id="date"
          type="datetime-local"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-4 flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-pulse">Criando evento...</span>
        ) : (
          "Salvar Evento"
        )}
      </button>
    </form>
  );
}
