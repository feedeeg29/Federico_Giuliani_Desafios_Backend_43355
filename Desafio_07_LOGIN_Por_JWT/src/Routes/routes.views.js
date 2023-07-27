import { Router } from 'express';
import productManager from '../DAOs/mongo/manager/manager.products.mongo.js';
import cartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';

//instancio los managers
const viewsRoutes = Router();
const manager = new productManager();
const cManager = new cartManager();

// ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});


//rutas cart

//Ruta para renderizar todos los cart
viewsRoutes.get('/carts', async (req, res) => {
    const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await cManager.getAllCarts(req, res, req.query);
    res.render('carts', { carts, hasNextPage, hasPrevPage, nextPage, prevPage });
});
//Ruta para renderizar un cart -- ID requerido
viewsRoutes.get('/cart', async (req, res) => {
    const cart = await cManager.getOneCart(req.params.id);
    res.render('cart', { cart });
});

//Rutas products

//Ruta para renderizar todos los productos
viewsRoutes.get('/products', async (req, res) => {
    const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await manager.getAll(req, res, req.query);
    res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage });
});

//Ruta para renderizar un producto -- ID requerido
viewsRoutes.get('/product/:id', async (req, res) => {
    const product = await manager.getOne(req.params.id);
    res.render('product', { product });
});

//Ruta para renderizar el formulario de creacion de productos
viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

//rutas de login y register
viewsRoutes.get('/login', (req, res) => {
    res.render('login');
});
viewsRoutes.get('/register', (req, res) => {
    res.render('register');
});
viewsRoutes.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});



export default viewsRoutes