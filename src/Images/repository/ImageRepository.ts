
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Image } from '../models/Image';

export class ImageRepository {
    public static async findAll(): Promise<Image[]> {
        const query = 'SELECT * FROM images';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const images: Image[] = results as Image[];
                    resolve(images);
                }
            });
        });
    }

    public static async findById(image_id: number): Promise<Image | null> {
        const query = 'SELECT * FROM images WHERE image_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [image_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const images: Image[] = results as Image[];
                    if (images.length > 0) {
                        resolve(images[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async addImage(image: Image): Promise<Image> {
        const query = 'INSERT INTO images (filename, path, mimetype, created_at) VALUES (?, ?, ?, ?)';
        const values = [
            image.filename,
            image.path,
            image.mimetype,
            image.created_at
        ];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const insertedId = (result as ResultSetHeader).insertId;
                    const insertedImage: Image = {
                        ...image,
                        image_id: insertedId 
                    };
                    resolve(insertedImage);
                }
            });
        });
    }

    public static async deleteImage(image_id: number): Promise<boolean> {
        const query = 'DELETE FROM images WHERE image_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [image_id], (error, result) => {
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
