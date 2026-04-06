import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "Descrição muito curta"),
  date: z.string().datetime({
    message: "Data inválida. Use o formato ISO (ex: 2024-12-31T20:00:00Z)",
  }),
});

export const updateEventSchema = createEventSchema.partial();

export const createParticipantSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
});

export const updateParticipantSchema = createParticipantSchema.partial();

export const enrollmentParticipantSchema = z.object({
  participantId: z.string().uuid("ID do participante inválido"),
});
