import { Router } from 'express';
import productManager from '../DAOs/mongo/manager/manager.products.mongo.js';


const mnrouter = Router();
const manager = new productManager();


//Endpoint para traer todos los productos 
mnrouter.get('/all', async (req, res) => {
    try {
        const products = await manager.getAll(req, res, req.query)
        console.log(products)
        res.json({ status: 200, data: products })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


//Endpoint para traer un producto -- ID requerido
mnrouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await manager.getOne(id)
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
    await manager.createProduct(product)
    res.json({ status: 200, data: product })
})


//Endpoint para actualizar un producto -- ID requerido
mnrouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product = req.body;
    await manager.updateProduct(id, product)
    res.json({ status: 200, data: product })
})


//Endpoint para eliminar un producto -- ID requerido
mnrouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await manager.deleteProduct(id)
    res.send(204)
})






//Export Modulo
export default mnrouter 