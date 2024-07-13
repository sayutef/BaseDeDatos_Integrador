export interface Delivery {
    delivery_id: number | null;
    purchaseOrder_id_fk: number;
    created_at: string;
    status_id_fk: number;
    date: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
