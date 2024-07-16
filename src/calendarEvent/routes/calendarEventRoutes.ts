import { Router } from "express";
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent,deleteLogicalEvent } from "../controllers/calendarEventControllers";

const eventRoutes: Router = Router();

eventRoutes.get('/', getAllEvents);
eventRoutes.get('/:event_id', getEventById);
eventRoutes.post('/', createEvent);
eventRoutes.put('/:event_id', updateEvent);
eventRoutes.delete('/:event_id', deleteEvent);
eventRoutes.put('/deleted/:event_id', deleteLogicalEvent);

export default eventRoutes;
