import { Router } from 'express';

import { daoFactory } from '../DAOs/Factory/dao.factory.js';
import Actions from '../Controller/actions.mongo.js'; // Importa la clase Actions desde la ubicación correcta


// Obtener el DAO adecuado
const currentDAO = daoFactory; // Sin .currentDAO()

// Crear una instancia de Actions con el DAO adecuado
const actions = new Actions(currentDAO);

//instancio los managers
const viewsRoutes = Router();


// ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});


//rutas cart

//Ruta para renderizar todos los cart
viewsRoutes.get('/carts', async (req, res) => {
    const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await actions.getAllCarts(req, res, req.query);
    res.render('carts', { carts, hasNextPage, hasPrevPage, nextPage, prevPage });
});
//Ruta para renderizar un cart -- ID requerido
viewsRoutes.get('/cart', async (req, res) => {
    const cart = await actions.getOneCart(req.params.id);
    res.render('cart', { cart });
});

//Rutas products

//Ruta para renderizar todos los productos
viewsRoutes.get('/products', async (req, res) => {
    const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await actions.getAll(req, res, req.query);
    res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage });
});

//Ruta para renderizar un producto -- ID requerido
viewsRoutes.get('/product/:id', async (req, res) => {
    const product = await actions.getOne(req.params.id);
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