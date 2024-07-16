export interface Delivery {
    delivery_id: number | null;
    created_at: string;
    status_id_fk: number;
    event_id_fk: number;
    date: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
