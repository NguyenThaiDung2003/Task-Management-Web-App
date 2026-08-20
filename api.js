import express from 'express';
const router = express.Router();

import categoryRouter from './controllers/category.controller.js'
import productRouter from './controllers/product.controller.js'
import userController from './controllers/user.controller.js'

router.use("/categories", categoryRouter);
router.use("/products", productRouter)
router.use("/users", userController)

export default router