// repositories/AddressRepository.ts
import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Address } from "../models/Addres";

export class AddressRepository {
    public static async findAll(): Promise<Address[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM address', (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const addresses: Address[] = result as Address[];
                    resolve(addresses);
                }
            });
        });
    }

    public static async findById(address_id: number): Promise<Address | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM address WHERE address_id = ?', [address_id], (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const addresses: Address[] = result as Address[];
                    if (addresses.length > 0) {
                        resolve(addresses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createAddress(address: Address): Promise<Address> {
        const query = 'INSERT INTO address (street, postal_code, municipality, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            address.updated_by = address.created_by;

            connection.execute(
                query,
                [
                    address.street,
                    address.postal_code,
                    address.municipality,
                    address.created_at,
                    address.created_by,
                    address.updated_at,
                    address.updated_by,
                    address.deleted || false
                ],
                (error, result: ResultSetHeader) => {
                    if (error) {
                        reject(error);
                    } else {
                        const createdAddressId = result.insertId;
                        const createdAddress: Address = { ...address, address_id: createdAddressId };
                        resolve(createdAddress);
                    }
                }
            );
        });
    }

    public static async updateAddress(addressId: number, addressData: Partial<Address>): Promise<Address | null> {
        const { street, postal_code, municipality, updated_at, updated_by, deleted } = addressData;
        const query = 'UPDATE address SET street = ?, postal_code = ?, municipality = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE address_id = ?';
        const params = [
            street !== undefined ? street : null,
            postal_code !== undefined ? postal_code : null,
            municipality !== undefined ? municipality : null,
            updated_at !== undefined ? updated_at : null,
            updated_by !== undefined ? updated_by : null,
            deleted !== undefined ? (deleted ? 1 : 0) : null,
            addressId
        ];

        return new Promise((resolve, reject) => {
            connection.execute(
                query,
                params,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        if ((result as ResultSetHeader).affectedRows > 0) {
                            const updatedAddress: Address = { ...addressData as Address, address_id: addressId };
                            resolve(updatedAddress);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    public static async deleteAddress(address_id: number): Promise<boolean> {
        const query = 'DELETE FROM address WHERE address_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [address_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    public static async deleteAddressLogic(address_id: number): Promise<boolean> {
        const query = 'UPDATE address SET deleted = 1 WHERE address_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [address_id], (error, result) => {
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
