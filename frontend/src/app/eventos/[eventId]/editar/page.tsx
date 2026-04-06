import Link from "next/link";
import EventForm from "../../../../components/EventForm";
import { api } from "../../../../lib/api";

export const dynamic = "force-dynamic";

async function getEventData(eventId: string) {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do evento para edição:", error);
    return null;
  }
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEventData(eventId);

  if (!eventData) {
    return (
      <main className="p-8 max-w-2xl mx-auto text-center mt-20">
        <h1 className="text-3xl font-bold text-red-600">
          Evento não encontrado
        </h1>
        <Link
          href="/"
          className="text-blue-600 hover:underline mt-4 inline-block font-medium"
        >
          &larr; Voltar para a página inicial
        </Link>
      </main>
    );
  }

  const formattedDate = new Date(eventData.date).toISOString().slice(0, 16);

  const initialData = {
    id: eventData.id,
    name: eventData.name,
    description: eventData.description,
    date: formattedDate,
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Evento</h1>
        <p className="text-gray-600 mb-8">
          Altere os dados abaixo e salve para atualizar o evento no sistema.
        </p>

        <EventForm initialData={initialData} />
      </div>
    </main>
  );
}
