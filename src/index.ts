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

  dotenv.config();

  const app: Application = express();
  const port: number = parseInt(process.env.PORT as string, 10);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/users', userRoutes); 
  app.use('/api/products', productRoutes); 
  app.use('/api/clients', clientRoutes);
  app.use('/api/purchaseOrders', purchaseOrderRoutes);
  app.use('/api/deliverys', deliveryRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
