import { Router } from 'express';
import productManager from '../DAOs/mongo/manager/manager.products.mongo.js';
const viewsRoutes = Router();
const manager = new productManager();
viewsRoutes.get('/', async (req, res) => {
    const products = await manager.getAll();
    res.render('products', { products });
});
export default viewsRoutes