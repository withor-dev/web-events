import Link from "next/link";
import EventForm from "../../../components/EventForm";

export default function NewEventPage() {
  return (
    <main className="mx-auto max-w-2xl p-8 mt-10">
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 hover:underline mb-8 inline-flex items-center"
      >
        &larr; Voltar para Eventos
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Criar Novo Evento
        </h1>
        <p className="text-gray-600 mb-8">
          Preencha os dados abaixo para cadastrar um novo evento na plataforma.
        </p>

        <EventForm />
      </div>
    </main>
  );
}
