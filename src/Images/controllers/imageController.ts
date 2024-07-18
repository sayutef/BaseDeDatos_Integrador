import { Request, Response } from 'express';
import { ImageService } from '../service/imageService';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

export const getAllImages = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const images = await ImageService.getAllImages();
        return res.status(200).json(images);
    } catch (error: any) {
        return res.status(500).json({ message: `Error retrieving images: ${error.message}` });
    }
};

export const getImageById = async (req: Request, res: Response): Promise<Response> => {
    const { image_id } = req.params;
    try {
        const image = await ImageService.getImageById(Number(image_id));
        if (image) {
            return res.status(200).json(image);
        } else {
            return res.status(404).json({ message: `Image not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error finding image: ${error.message}` });
    }
};

export const createImage = (req: Request, res: Response) => {
    upload(req, res, function (err: any) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Verificar si req.file está definido
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const image = {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
        };

        // Aquí puedes usar image.filename, image.path, etc. para hacer lo que necesites con la información del archivo

        return res.status(201).json({ filename: image.filename, path: image.path });
    });
};

export const deleteImage = async (req: Request, res: Response): Promise<Response> => {
    const { image_id } = req.params;
    try {
        const success = await ImageService.deleteImage(Number(image_id));
        if (success) {
            return res.status(200).json({ message: `Image deleted successfully` });
        } else {
            return res.status(404).json({ message: `Image not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error deleting image: ${error.message}` });
    }
};
