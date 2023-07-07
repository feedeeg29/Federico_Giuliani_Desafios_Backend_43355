const express = require('express');
const router = express.Router();


// Instancia de la clase ProductManager
const ProductManager = require('../ClassContainer/ClassContainer');
const manager = new ProductManager('Fede');


//ruta base, no tiene mucho contenido pero la dejo preparada
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', { products: products });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', { products, layout: 'realTimeProducts' });
});


//ruta para agregar productos
router.get('/addProduct', (req, res) => {
    res.render('addProduct');
});

//ruta para traer todos los productos
router.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await manager.getProducts(limit);
    res.json(products);
});
//ruta para traer un producto por id
router.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await manager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// En tu archivo de rutas ("/routes/routes.js")
router.post('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await manager.removeProductById(productId);
        res.redirect('/realTimeProducts');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//ruta eliminar producto por id
router.delete('/products/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        await manager.removeProductById(productId);
        res.sendStatus(200); // Envía una respuesta exitosa al cliente
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.sendStatus(500); // Envía una respuesta de error al cliente
    }
});

module.exports = router;