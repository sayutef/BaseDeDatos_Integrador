import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import userRoutes from './User/routes/userRoutes';
import { errorHandler } from './shared/middlewares/errorHandlers';
import { notFoundHandler } from './shared/middlewares/notFoundHandlers';
import productsRoutes from './product/routes/productRoutes';
import purchaseOrderRoutes from './purchase_order/routes/purchaseOrderRoutes';
import deliveryRoutes from './delivery/routes/deliveryRoutes';
import roleRoutes from './role/routes/roleRoutes';
import categoryRouters from './category/routes/categoryRoutes';
import morgan from 'morgan';
import imageRoutes from './Images/routes/imageRoutes';
import cors from 'cors';
import statusRoutes from './status/routes/statusRoutes';
import eventRoutes from './calendarEvent/routes/calendarEventRoutes';
/*
import https from 'https';
import fs from 'fs';
*/


dotenv.config();

const app = express();
app.use(morgan('dev'))
app.use('/images', imageRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS configuration
const corsOptions = {
  origin: ['https://ferreteriaapi.integrador.xyz', 'https://ferreteria.integrador.xyz'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
*/
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hola, mundo!');
  });

app.use('/api/rol', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use("/api/categories", categoryRouters);
app.use('/api/purchaseOrders', purchaseOrderRoutes);
app.use('/api/deliverys', deliveryRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/event', eventRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Route for testing CORS
app.get('/', (_req, res) => {
  res.send('CORS configurado correctamente!');
});

const port = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
/*
const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});
*/