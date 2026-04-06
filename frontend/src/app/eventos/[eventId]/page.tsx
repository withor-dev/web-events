import { api } from "../../../lib/api";
import { Event, Participant } from "../../../types";
import Link from "next/link";
import EventActions from "../../../components/EventActions";
import ParticipantActions from "../../../components/ParticipantActions";

export const dynamic = "force-dynamic";

async function getEventData(eventId: string) {
  try {
    const [eventRes, participantsRes] = await Promise.all([
      api.get(`/events/${eventId}`),
      api.get(`/events/${eventId}/participants`),
    ]);

    return {
      event: eventRes.data as Event,
      participants: participantsRes.data as Participant[],
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do evento:", error);
    return null;
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const data = await getEventData(eventId);

  if (!data) {
    return (
      <main className="p-8 max-w-5xl mx-auto text-center mt-20">
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

  const { event, participants } = data;

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-flex items-center"
      >
        &larr; Voltar para Eventos
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
          <EventActions eventId={event.id} />
        </div>
        <p className="text-gray-600 mb-6 text-lg">{event.description}</p>
        <div className="inline-flex items-center text-sm font-medium text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          {" "}
          {new Intl.DateTimeFormat("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(event.date))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Participantes ({participants.length})
        </h2>
        <Link
          href={`/eventos/${eventId}/inscrever`}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
        >
          + Inscrever Participante
        </Link>
      </div>

      {participants.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500">
          Nenhum participante inscrito neste evento ainda.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {participants.map((participant) => (
              <li
                key={participant.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <p className="font-bold text-gray-900 text-lg">
                  {participant.name}
                </p>
                <div className="mt-2 flex gap-6 text-sm text-gray-600 font-medium">
                  <span className="flex items-center gap-1">
                    ✉️ {participant.email}
                  </span>
                  <span className="flex items-center gap-1">
                    📱 {participant.phone}
                  </span>
                </div>
                <ParticipantActions
                  eventId={event.id}
                  participantId={participant.id}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
