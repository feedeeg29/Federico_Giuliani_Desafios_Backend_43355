import { Router } from 'express';
import cartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';


const cartMongoRoutes = Router();
const manager = new cartManager();
//Rutas Cart

//Traer todos los Cart
cartMongoRoutes.get('/', async (req, res) => {
    try {
        const carts = await manager.getAllCarts(req, res, req.query)
        console.log(...carts)
        res.json({ status: 200, data: carts })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Traer un Cart por ID
cartMongoRoutes.get('/:id', async (req, res) => {
    try {
        const cart = await manager.getOneCart(req.params.id)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Crear un Cart
cartMongoRoutes.post('/', async (req, res) => {
    try {
        const cart = await manager.createCart(req.body)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Agregar un producto al Cart
cartMongoRoutes.post('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await manager.addToCart(req.params.id, req.params.productId)

        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Actualizar un Cart
cartMongoRoutes.put('/:id', async (req, res) => {
    try {
        const cart = await manager.updateCart(req.params.id, req.body)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Borrar un Cart segun ID 
cartMongoRoutes.delete('/:id', async (req, res) => {
    try {
        const cart = await manager.deleteCart(req.params.id)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
//Borrar un producto del Cart
cartMongoRoutes.delete('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await manager.removeFromCart(req.params.id, req.params.productId)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})

//export del modulo
export default cartMongoRoutes