export interface Delivery{
    delivery_id: number | null;
    purchaseOrder_id_fk :number;
    created_at: String;
    status:string;
    date: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}
