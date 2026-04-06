import { api } from "../lib/api";
import { Event } from "../types";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getEvents(): Promise<Event[]> {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Eventos</h1>
          <p className="mt-2 text-gray-600">
            Gerencie seus eventos e participantes.
          </p>
        </div>
        <Link
          href="eventos/novo"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 shadow-md"
        >
          + Criar Evento
        </Link>
      </header>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Nenhum evento cadastrado ainda.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/eventos/${event.id}`}
              className="group"
            >
              <article className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg">
                <div>
                  <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.name}
                  </h2>
                  <p className="line-clamp-2 text-sm text-gray-600 mb-4">
                    {event.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                  {" "}
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(event.date))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
