import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import userRoutes from './User/routes/userRoutes';
import { errorHandler } from './shared/middlewares/errorHandlers';
import { notFoundHandler } from './shared/middlewares/notFoundHandlers';
import productRoutes from './product/routes/productRoutes';
import clientRoutes from './client/routes/clientRoutes';
import purchaseOrderRoutes from './purchase_order/routes/purchaseOrderRoutes';
import deliveryRoutes from './delivery/routes/deliveryRoutes';
import roleRoutes from './role/routes/roleRoutes';
import https from 'https';
import fs from 'fs';


dotenv.config();



const app: Application = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/rol', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/purchaseOrders', purchaseOrderRoutes);
app.use('/api/deliverys', deliveryRoutes);


app.use(notFoundHandler);
app.use(errorHandler);


const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};


const port: number = parseInt(process.env.PORT as string, 10) || 3000;

https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${port}`);
});
