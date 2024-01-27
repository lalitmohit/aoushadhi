import express from 'express';
const router = express();
import { registerUser, loginUser ,token} from '../controllers/user/userController.js';
import { cart_data_get,cart_data_post,cart_data_del, cart_data_update} from '../controllers/cart/cartController.js';
import { order_data_get,order_data_post,order_data_del} from '../controllers/order/orderController.js';
import { product_data_get,product_data_post,product_data_update } from '../controllers/product/productController.js';

// import { authenticateToken } from "../../middlewares/auth.js";


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/token',token);
router.get('/cart_data_get',cart_data_get);
router.post('/cart_data_post',cart_data_post);
router.delete('/cart_data_del',cart_data_del);
router.put('/cart_data_update',cart_data_update);
router.get('/order_data_get',order_data_get);
router.post('/order_data_post',order_data_post);
router.delete('/order_data_del',order_data_del);
router.get('/product_data_get',product_data_get);
router.post('/product_data_post',product_data_post);
router.put('/product_data_update',product_data_update);


export default router;