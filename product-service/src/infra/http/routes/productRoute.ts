import { Router } from 'express';
import { wrapController } from '../../../utils/wrapController';
import { ProductController } from '../controllers/ProductController';
import { validate } from '../middlewares/validate';
import { schemaProduct } from '../../schema/product/createProductSchema';

const productRoute = Router();
const controller = wrapController(new ProductController());

productRoute.post('/', validate(schemaProduct), controller.create);
productRoute.get('/', controller.list);

export default productRoute;