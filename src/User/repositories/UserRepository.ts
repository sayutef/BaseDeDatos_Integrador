import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { User } from "../models/User";

export class UserRepository {

    public static async findAll(): Promise<User[]> {
        const query = "SELECT * FROM user WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }
    
    public static async findById(user_id: number): Promise<User | null> {
        const query = "SELECT * FROM user WHERE user_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    
    public static async findByName(name: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM user WHERE name= ?', [name], (error: any, results) => {
            if (error) {
              reject(error);
            } else {
              const employees: User[] = results as User[];
              if (employees.length > 0) {
                resolve(employees[0]);
              } else {
                resolve(null);
              }
            }
          });
        });
      }

    public static async createUser(user: User): Promise<User> {
        const { name, password, role_id_fk,created_at, created_by, updated_at, updated_by, deleted } = user;
        const query = `INSERT INTO user (name, password, role_id_fk, created_at,created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
        const values = [name, password, role_id_fk,created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createUserId = (result as any).insertId;
                    const createdUser: User = { ...user, user_id: createUserId };
                    resolve(createdUser);
                }
            });
        });
    }
    
    public static async updateUser(userId: number, userData: User): Promise<User | null> {
        const { name, role_id_fk, updated_at, updated_by, deleted } = userData;
        const query = `UPDATE user SET name = ?, role_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE user_id = ?`;
        const values = [name, role_id_fk, updated_at, updated_by, deleted ? 1 : 0, userId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, user_id: userId });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteUser(user_id: number): Promise<boolean> {
        const query = 'DELETE FROM user WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, result) => {
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

    public static async deleteLogic(user_id: number): Promise<boolean> {
        const query = 'UPDATE user SET deleted = 1 WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, result) => {
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
