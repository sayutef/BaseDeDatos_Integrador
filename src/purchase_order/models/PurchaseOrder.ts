export interface PurchaseOrder{
    purchaseOrder_id : number | null;
    date: string;
    total: string;
    client_id_fk : number;
    address_id_fk:number;
    status_id_fk:number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}