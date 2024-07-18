
import { ImageRepository } from '../repository/ImageRepository';
import { Image } from '../models/Image';

export class ImageService {
    public static async getAllImages(): Promise<Image[]> {
        try {
            return await ImageRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error retrieving images: ${error.message}`);
        }
    }

    public static async getImageById(image_id: number): Promise<Image | null> {
        try {
            return await ImageRepository.findById(image_id);
        } catch (error: any) {
            throw new Error(`Error finding image: ${error.message}`);
        }
    }

    public static async addImage(image: Image): Promise<Image> {
        try {
            return await ImageRepository.addImage(image);
        } catch (error: any) {
            throw new Error(`Error creating image: ${error.message}`);
        }
    }

    public static async deleteImage(image_id: number): Promise<boolean> {
        try {
            return await ImageRepository.deleteImage(image_id);
        } catch (error: any) {
            throw new Error(`Error deleting image: ${error.message}`);
        }
    }
}
