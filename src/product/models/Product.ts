export interface Product{
    product_id: number | null;
    name: string;
    description: string ;
    price: number ;
    stock: number;
    category_id_fk: number;
    created_at: string;
    created_by: string ;
    updated_at: string ;
    updated_by: string ;
    deleted: boolean;
}