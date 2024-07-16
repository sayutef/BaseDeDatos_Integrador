import { CalendarEvent } from '../models/CalendarEvent';
import { EventRepository } from '../repository/CalendarEventRepository';
import { DateUtils } from '../../shared/utils/DateUtils';

export class EventService {
    public static async getAllEvents(): Promise<CalendarEvent[]> {
        try {
            return await EventRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener eventos: ${error.message}`);
        }
    }

    public static async getEventById(eventId: number): Promise<CalendarEvent | null> {
        try {
            return await EventRepository.findById(eventId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el evento: ${error.message}`);
        }
    }

    public static async addEvent(event: CalendarEvent): Promise<CalendarEvent> {
        try {
            const currentDate = new Date();
            event.created_at = DateUtils.formatDate(currentDate);
            event.updated_at = DateUtils.formatDate(currentDate);

            return await EventRepository.createEvent(event);
        } catch (error: any) {
            throw new Error(`Error al crear evento: ${error.message}`);
        }
    }

    public static async modifyEvent(eventId: number, eventData: CalendarEvent): Promise<CalendarEvent | null> {
        try {
            const eventFound = await EventRepository.findById(eventId);

            if (eventFound) {
                if (eventData.title) {
                    eventFound.title = eventData.title;
                }
                if (eventData.start) {
                    eventFound.start = eventData.start;
                }
                if (eventData.end) {
                    eventFound.end = eventData.end;
                }
                if (eventData.updated_at) {
                    eventFound.updated_at = eventData.updated_at;
                }
                if (eventData.updated_by) {
                    eventFound.updated_by = eventData.updated_by;
                }
                if (eventData.deleted !== undefined) {
                    eventFound.deleted = eventData.deleted;
                }

                eventFound.updated_at = DateUtils.formatDate(new Date());

                return await EventRepository.updateEvent(eventId, eventFound);
            }
            return null;
        } catch (error: any) {
            throw new Error(`Error al actualizar evento: ${error.message}`);
        }
    }

    public static async deleteEvent(eventId: number): Promise<boolean> {
        try {
            return await EventRepository.deleteEvent(eventId);
        } catch (error: any) {
            throw new Error(`Error al eliminar evento: ${error.message}`);
        }
    }

    public static async deleteEventLogic(eventId: number): Promise<boolean> {
        try {
            return await EventRepository.deleteEventLogic(eventId);
        } catch (error: any) {
            throw new Error(`Error al eliminar lógicamente evento: ${error.message}`);
        }
    }
}
