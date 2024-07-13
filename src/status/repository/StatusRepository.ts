// repositories/StatusRepository.ts
import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Status } from "../models/Status";

export class StatusRepository {
    
    public static async findAll(): Promise<Status[]> {
        const query = "SELECT * FROM status WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const statuses: Status[] = results as Status[];
                    resolve(statuses);
                }
            });
        });
    }

    public static async findById(status_id: number): Promise<Status | null> {
        const query = "SELECT * FROM status WHERE status_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [status_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const statuses: Status[] = results as Status[];
                    if (statuses.length > 0) {
                        resolve(statuses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByName(name: string): Promise<Status | null> {
        const query = "SELECT * FROM status WHERE name = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [name], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const statuses: Status[] = results as Status[];
                    if (statuses.length > 0) {
                        resolve(statuses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createStatus(status: Status): Promise<Status> {
        const query = `INSERT INTO status (name, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(query, [status.name, status.created_at, status.created_by, status.updated_at, status.updated_by, status.deleted ? 1 : 0], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdStatusId = (result as ResultSetHeader).insertId;
                    const createdStatus: Status = { ...status, status_id: createdStatusId };
                    resolve(createdStatus);
                }
            });
        });
    }

    public static async updateStatus(status_id: number, statusData: Status): Promise<Status | null> {
        const { name, updated_at, updated_by, deleted } = statusData;
        const query = `UPDATE status SET name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE status_id = ?`;
        const values = [name, updated_at, updated_by, deleted ? 1 : 0, status_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        const updatedStatus: Status = { ...statusData, status_id: status_id };
                        resolve(updatedStatus);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteStatus(status_id: number): Promise<boolean> {
        const query = 'DELETE FROM status WHERE status_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [status_id], (error, result) => {
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

    public static async deleteStatusLogic(status_id: number): Promise<boolean> {
        const query = 'UPDATE status SET deleted = 1 WHERE status_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [status_id], (error, result) => {
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
