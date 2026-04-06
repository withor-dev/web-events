import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { createEventSchema, updateEventSchema } from "../schemas/validation";

type EventParams = {
  eventId: string;
};

export const EventController = {
  async createEvent(req: Request, res: Response) {
    const validatedData = createEventSchema.parse(req.body);
    const event = await EventService.create(validatedData);
    res.status(201).json(event);
  },

  async getAllEvents(req: Request, res: Response) {
    const events = await EventService.getAll();
    res.json(events);
  },

  async getEventById(req: Request<EventParams>, res: Response) {
    const { eventId } = req.params;
    const event = await EventService.getById(eventId);

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }

    res.json(event);
  },

  async updateEvent(req: Request<EventParams>, res: Response) {
    const { eventId } = req.params;
    const validatedData = updateEventSchema.parse(req.body);
    const event = await EventService.update(eventId, validatedData);
    res.json(event);
  },

  async deleteEvent(req: Request<EventParams>, res: Response) {
    const { eventId } = req.params;
    await EventService.delete(eventId);
    res.status(204).send();
  },
};
