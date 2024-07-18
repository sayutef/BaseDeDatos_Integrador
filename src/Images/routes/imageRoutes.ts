// routes/imageRoutes.ts
import express from 'express';
import multer from 'multer';
import * as imageController from '../controllers/imageController';

const imageRoutes = express.Router();
const upload = multer({ dest: 'uploads/' });

imageRoutes.get('/', imageController.getAllImages);
imageRoutes.get('/:image_id', imageController.getImageById);
imageRoutes.post('/', upload.single('image'), imageController.createImage);
imageRoutes.delete('/:image_id', imageController.deleteImage);

export default imageRoutes;
