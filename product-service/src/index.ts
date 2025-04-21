import express from 'express';
import { errorHandler } from './utils/errorHandler';
import productRoute from './infra/http/routes/productRoute';

const app = express();

app.use(express.json());

app.use('/product', productRoute);

app.use(errorHandler);

export default app;