import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Client } from "../models/Client";

export class ClientRepository {
    public static async findAll(): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM client', (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const clients: Client[] = result as Client[];
                    resolve(clients);
                }
            });
        });
    }

    public static async findById(client_id: number): Promise<Client | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM client WHERE client_id = ?', [client_id], (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const clients: Client[] = result as Client[];
                    if (clients.length > 0) {
                        resolve(clients[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createClient(client: Client): Promise<Client> {
        const query = 'INSERT INTO client (name, age, address, phone_number, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            client.updated_by = client.created_by;
    
            connection.execute(
                query,
                [
                    client.name || null,
                    client.age || null,
                    client.address || null,
                    client.phone_number || null,
                    client.created_at || null,
                    client.created_by || null,
                    client.updated_at || null,
                    client.updated_by || null,  
                    client.deleted || false
                ],
                (error, result: ResultSetHeader) => {
                    if (error) {
                        reject(error);
                    } else {
                        const createdClientId = result.insertId;
                        const createdClient: Client = { ...client, client_id: createdClientId };
                        resolve(createdClient);
                    }
                }
            );
        });
    }


    public static async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client | null> {
        const { name, age, address, phone_number, updated_at, updated_by, deleted } = clientData;
        const query = 'UPDATE client SET name = ?, age = ?, address = ?, phone_number = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE client_id = ?';
        const params = [
            name !== undefined ? name : null,
            age !== undefined ? age : null,
            address !== undefined ? address : null,
            phone_number !== undefined ? phone_number : null,
            updated_at !== undefined ? updated_at : null,
            updated_by !== undefined ? updated_by : null,
            deleted !== undefined ? (deleted ? 1 : 0) : null,
            clientId
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
                            const updatedClient: Client = { ...clientData as Client, client_id: clientId };
                            resolve(updatedClient);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    public static async deleteClient(client_id: number): Promise<boolean> {
        const query = 'DELETE FROM client WHERE client_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [client_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
    public static async deleteClientLogic(role_id: number): Promise<boolean> {
        const query = 'UPDATE client SET deleted = 1 WHERE role_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [role_id], (error, result) => {
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


