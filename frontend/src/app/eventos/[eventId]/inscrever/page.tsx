"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "../../../../lib/api";
import Link from "next/link";
import { isAxiosError } from "axios";

export default function EnrollParticipantPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const participantRes = await api.post("/participants", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      const newParticipantId = participantRes.data.id;

      await api.post(`/events/${eventId}/participants`, {
        participantId: newParticipantId,
      });

      router.push(`/eventos/${eventId}`);
      router.refresh();
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Erro ao inscrever participante.");
      } else {
        setError("Ocorreu um erro inesperado. Verifique sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          Inscrever Participante
        </h1>
        <p className="text-gray-600 mb-8">
          Adicione um novo participante à lista de convidados deste evento.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: João da Silva"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="joao@exemplo.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="(41) 99999-9999"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-4 flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-pulse">Inscrevendo...</span>
            ) : (
              "Confirmar Inscrição"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
