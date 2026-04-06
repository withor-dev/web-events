import { prisma } from "../lib/prisma";

export const ParticipantService = {
  async create(data: { name: string; email: string; phone: string }) {
    return prisma.participant.create({ data });
  },

  async getParticipants(eventId: string) {
    const registrations = await prisma.registration.findMany({
      where: { eventId },
      include: { participant: true },
    });
    return registrations.map((reg) => reg.participant);
  },

  async getById(id: string) {
    return prisma.participant.findUnique({ where: { id } });
  },

  async update(
    id: string,
    data: { name?: string; email?: string; phone?: string },
  ) {
    return prisma.participant.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.participant.delete({
      where: { id },
    });
  },

  async enrollParticipant(eventId: string, participantId: string) {
    return prisma.registration.create({
      data: { eventId, participantId },
    });
  },
};
