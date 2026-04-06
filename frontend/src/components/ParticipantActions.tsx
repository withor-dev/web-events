"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import Link from "next/link";

interface Props {
  eventId: string;
  participantId: string;
}

export default function ParticipantActions({ eventId, participantId }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir este participante? Ele será removido do sistema permanentemente.",
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await api.delete(`/participants/${participantId}`);
        router.refresh();
      } catch (error) {
        alert("Erro ao excluir participante.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/eventos/${eventId}/participantes/${participantId}/editar`}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
      >
        {isDeleting ? "Excluindo..." : "Excluir"}
      </button>
    </div>
  );
}
