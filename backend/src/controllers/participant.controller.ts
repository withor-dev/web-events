import { Request, Response } from "express";
import { ParticipantService } from "../services/participant.service";
import {
  createParticipantSchema,
  updateParticipantSchema,
  enrollmentParticipantSchema,
} from "../schemas/validation";

type ParticipantParams = {
  eventId: string;
  participantId: string;
};

export const ParticipantController = {
  async createParticipant(req: Request, res: Response) {
    const validatedData = createParticipantSchema.parse(req.body);
    const participant = await ParticipantService.create(validatedData);
    res.status(201).json(participant);
  },

  async getEventParticipants(req: Request<ParticipantParams>, res: Response) {
    const { eventId } = req.params;
    const participants = await ParticipantService.getParticipants(eventId);
    res.json(participants);
  },

  async getParticipant(req: Request<ParticipantParams>, res: Response) {
    const { participantId } = req.params;
    const participant = await ParticipantService.getById(participantId);

    if (!participant) {
      res.status(404).json({ error: "Participante não encontrado" });
      return;
    }
    res.json(participant);
  },

  async updateParticipant(req: Request<ParticipantParams>, res: Response) {
    const { participantId } = req.params;
    const validatedData = updateParticipantSchema.parse(req.body);
    const participant = await ParticipantService.update(
      participantId,
      validatedData,
    );
    res.json(participant);
  },

  async deleteParticipant(req: Request<ParticipantParams>, res: Response) {
    const { participantId } = req.params;
    await ParticipantService.delete(participantId);
    res.status(204).send();
  },

  async enrollParticipant(req: Request<ParticipantParams>, res: Response) {
    const { eventId } = req.params;
    const { participantId } = enrollmentParticipantSchema.parse(req.body);
    const registration = await ParticipantService.enrollParticipant(
      eventId,
      participantId,
    );
    res
      .status(201)
      .json({ message: "Inscrição realizada com sucesso!", registration });
  },
};
