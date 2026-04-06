// backend/src/services/event.service.ts
import { prisma } from "../lib/prisma";

export const EventService = {
  async create(data: { name: string; description: string; date: string }) {
    return prisma.event.create({
      data: { ...data, date: new Date(data.date) },
    });
  },

  async getAll() {
    return prisma.event.findMany({
      orderBy: { date: "asc" },
    });
  },

  async getById(id: string) {
    return prisma.event.findUnique({
      where: { id },
    });
  },

  async update(
    id: string,
    data: { name?: string; description?: string; date?: string },
  ) {
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }
    return prisma.event.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.event.delete({
      where: { id },
    });
  },
};
