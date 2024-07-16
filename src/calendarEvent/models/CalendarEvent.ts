export interface CalendarEvent {
    calendarEvent_id: number | null;
    start: string;
    end: string;
    title: string;
    purchaseOrder_id_fk:number;
    created_at: string; 
    created_by: string;
    updated_at: string; 
    updated_by: string;
    deleted: boolean;
}
