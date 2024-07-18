import { Router } from "express";
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent,deleteLogicalEvent } from "../controllers/calendarEventControllers";
import { authMiddleware } from "../../shared/middlewares/auth";

const eventRoutes: Router = Router();

eventRoutes.get('/', authMiddleware, getAllEvents);
eventRoutes.get('/:event_id',authMiddleware,  getEventById);
eventRoutes.post('/', authMiddleware, createEvent);
eventRoutes.put('/:event_id',authMiddleware,  updateEvent);
eventRoutes.delete('/:event_id',authMiddleware,  deleteEvent);
eventRoutes.put('/deleted/:event_id', authMiddleware, deleteLogicalEvent);

export default eventRoutes;
