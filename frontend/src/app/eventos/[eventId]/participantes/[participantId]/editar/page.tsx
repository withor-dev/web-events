"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "../../../../../../lib/api";
import Link from "next/link";

export default function EditParticipantPage() {
  const router = useRouter();
  const params = useParams();

  const eventId = params.eventId as string;
  const participantId = params.participantId as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    api
      .get(`/participants/${participantId}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch(() => setError("Erro ao carregar dados do participante."))
      .finally(() => setFetching(false));
  }, [participantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put(`/participants/${participantId}`, formData);
      router.push(`/eventos/${eventId}`);
      router.refresh();
    } catch (err) {
      setError("Erro ao atualizar participante.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center mt-20 font-medium text-gray-500 animate-pulse">
        Carregando participante...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8 mt-10">
      <Link
        href={`/eventos/${eventId}`}
        className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-flex items-center"
      >
        &larr; Voltar para o Evento
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Editar Participante
        </h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </main>
  );
}
