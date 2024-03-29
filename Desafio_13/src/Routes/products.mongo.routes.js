import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js'
import { generateProduct } from '../utils/Mock/mock.products.js';
import { developmentLogger } from '../utils/Logger/logger.js';

const mnrouter = Router();


//Endpoint para traer todos los productos 
mnrouter.get('/', async (req, res) => {
    try {
        const products = await ActionsMongo.getAll(req, req.query)
        res.status(200).json({ status: 200, data: products })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


//Endpoint para traer un producto -- ID requerido
mnrouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ActionsMongo.getOne(id)
        res.json({ status: 200, data: product })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


//Endpoint para crear un producto
mnrouter.post("/", async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    if (!name || !description || !code || !thumbnail || !price || !stock) {
        return res.json({ status: 400, err: "Faltan datos" })
    }
    const product = req.body;
    console.log(product)
    await ActionsMongo.createProduct(product)
    //res.json({ status: 200, data: product })
})


//Endpoint para actualizar un producto -- ID requerido
mnrouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product = req.body;
    await ActionsMongo.updateProduct(id, product)
    res.json({ status: 200, data: product })
})


//Endpoint para eliminar un producto -- ID requerido
mnrouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await ActionsMongo.deleteProduct(id)
    res.send(204)
})

mnrouter.get("/mocks", (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }
        developmentLogger.debug(products)
        res.send({ status: 200 })
    } catch (error) {
        res.status(500).json({ status: 500, err: "Error al generar productos" });
        developmentLogger.fatal(error)
    }
});






//Export Modulo
export default mnrouter 