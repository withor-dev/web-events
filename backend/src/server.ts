import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { EventController } from "./controllers/event.controller";
import { ParticipantController } from "./controllers/participant.controller";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

// Events
app.post("/events", EventController.createEvent);
app.get("/events", EventController.getAllEvents);
app.get("/events/:eventId", EventController.getEventById);
app.put("/events/:eventId", EventController.updateEvent);
app.delete("/events/:eventId", EventController.deleteEvent);

// Participants
app.post("/participants", ParticipantController.createParticipant);
app.get("/participants/:participantId", ParticipantController.getParticipant);
app.get(
  "/events/:eventId/participants",
  ParticipantController.getEventParticipants,
);
app.post(
  "/events/:eventId/participants",
  ParticipantController.enrollParticipant,
);
app.put(
  "/participants/:participantId",
  ParticipantController.updateParticipant,
);
app.delete(
  "/participants/:participantId",
  ParticipantController.deleteParticipant,
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Dados inválidos", details: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({
        error: "Conflito de dados: Este registro já existe no sistema.",
      });
      return;
    }
  }

  console.error("Erro interno:", err);
  res.status(500).json({ error: "Erro interno no servidor" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT} com Express 5!`);
});
