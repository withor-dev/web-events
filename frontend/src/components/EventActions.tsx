"use client";

import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import Link from "next/link";
import { useState } from "react";

export default function EventActions({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este evento? Todas as inscrições também serão apagadas.",
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await api.delete(`/events/${eventId}`);
        router.push("/");
        router.refresh();
      } catch (error) {
        alert("Erro ao excluir o evento.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/eventos/${eventId}/editar`}
        className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        Editar
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {isDeleting ? "Excluindo..." : "Excluir"}
      </button>
    </div>
  );
}
