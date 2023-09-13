import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js'
import { developmentLogger } from "../utils/Logger/logger.js"

const cartMongoRoutes = Router();

//Rutas Cart

//Traer todos los Cart
cartMongoRoutes.get('/', async (req, res) => {
    try {
        const carts = await ActionsMongo.getAllCarts(req, res, req.query)
        developmentLogger.info(...carts)
        res.json({ status: 200, data: carts })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Traer un Cart por ID
cartMongoRoutes.get('/:id', async (req, res) => {
    try {
        const cart = await ActionsMongo.getOneCart(req.params.id)
        developmentLogger.debug(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Crear un Cart
cartMongoRoutes.post('/', async (req, res) => {
    try {
        const cart = await ActionsMongo.createCart(req.body)
        developmentLogger.debug(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Agregar un producto al Cart
cartMongoRoutes.post('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await ActionsMongo.addToCart(req.params.id, req.params.productId)

        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Actualizar un Cart
cartMongoRoutes.put('/:id', async (req, res) => {
    try {
        const cart = await ActionsMongo.updateCart(req.params.id, req.body)
        developmentLogger.debug(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Borrar un Cart segun ID 
cartMongoRoutes.delete('/:id', async (req, res) => {
    try {
        const cart = await ActionsMongo.deleteCart(req.params.id)
        developmentLogger.debug(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
//Borrar un producto del Cart
cartMongoRoutes.delete('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await ActionsMongo.removeFromCart(req.params.id, req.params.productId)
        developmentLogger.debug(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
        developmentLogger.fatal(err)
    }
})
cartMongoRoutes.post('/:cid/purchase', async (req, res) => {
    try {
        return ActionsMongo.finishPurchase()
    } catch (error) {
        developmentLogger.fatal(err)
    }
});

//export del modulo
export default cartMongoRoutes