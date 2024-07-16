import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { CalendarEvent } from '../models/CalendarEvent';

export class EventRepository {
    public static async findAll(): Promise<CalendarEvent[]> {
        const query = 'SELECT * FROM event WHERE deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const events: CalendarEvent[] = results as CalendarEvent[];
                    resolve(events);
                }
            });
        });
    }

    public static async findById(event_id: number): Promise<CalendarEvent | null> {
        const query = 'SELECT * FROM event WHERE calendarEvent_id = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [event_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const events: CalendarEvent[] = results as CalendarEvent[];
                    if (events.length > 0) {
                        resolve(events[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
        const { start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted } = event;
        const query = `INSERT INTO event (start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createEventId = (result as any).insertId;
                    const createdEvent: CalendarEvent = { ...event, calendarEvent_id: createEventId };
                    resolve(createdEvent);
                }
            });
        });
    }

    public static async updateEvent(eventId: number, eventData: CalendarEvent): Promise<CalendarEvent | null> {
        const { start, end, title, updated_at, updated_by, deleted } = eventData;
        const query = `UPDATE event SET start = ?, end = ?, title = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE calendarEvent_id = ?`;
        const values = [start, end, title, updated_at, updated_by, deleted ? 1 : 0, eventId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...eventData, calendarEvent_id: eventId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteEvent(event_id: number): Promise<boolean> {
        const query = 'DELETE FROM event WHERE calendarEvent_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [event_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deleteEventLogic(event_id: number): Promise<boolean> {
        const query = 'UPDATE event SET deleted = 1 WHERE calendarEvent_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [event_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
