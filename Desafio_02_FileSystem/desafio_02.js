const fs = require("fs");

class ProductManager {
    constructor(file) {
        this.file = file + ".JSON";
        this.products = [];
        this.nextId = 1;
    }

    async addProduct(product) {
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    // Validar que todos los campos sean obligatorios
                    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                        console.log("Error: Todos los campos son obligatorios");
                        return;
                    }

                    // Validar que no se repita el campo "code"
                    if (this.products.find((p) => p.code === product.code)) {
                        console.log("Error: El código ya existe");
                        return;
                    }
                    // Agregar el producto con un id autoincrementable
                    product.id = this.nextId++;
                    this.products.push(product);
                    await fs.promises.writeFile(this.file, JSON.stringify(this.products, null, "\t"));
                }
                console.log("Producto agregado correctamente")
            } else {
                product.id = this.nextId++;
                await fs.promises.writeFile(this.file, JSON.stringify([product], null, "\t"));
                console.log("que salga lo que tenga que salgar")
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    return this.products;
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        }
        catch (error) {
            throw new Error("Error: ", error);

        }
    }

    async getProductById(id) {
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const product = await this.products.find((p) => p.id === id);
                    if (product) {
                        return product;
                    } else {
                        console.log(`Error: Producto con el id "${id}" no encontrado`);
                    }
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }
    }
    async removeProductById(id) {
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const index = this.products.findIndex((p) => p.id === id);
                    if (index !== -1) {
                        this.products.splice(index, 1);
                        console.log("Producto eliminado correctamente");
                    }
                } else {
                    console.log("Error: Producto no encontrado");
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }
    }
}

// Prueba de funcionamiento, primero, creamos una instancia de ProductManager
const manager = new ProductManager("Fede");

// Agregamos productos para poder pobrar
/*(async function () {
    await manager.addProduct({
        title: "Producto 1",
        description: "Descripción del producto 1",
        price: 10.99,
        thumbnail: "path/imagen1.jpg",
        code: "fede123",
        stock: 5,
    });

    await manager.addProduct({
        title: "Producto 2",
        description: "Descripción del producto 2",
        price: 234.30,
        thumbnail: "path/imagen2.jpg",
        code: "fede456",
        stock: 3,
    });

    await manager.addProduct({
        title: "Producto 3",
        description: "Descripción del producto 3",
        price: 23.23,
        thumbnail: "path/imagen2.jpg",
        code: "fede789",
        stock: 8,
    })

    await manager.addProduct({
        title: "Producto 4",
        description: "Descripción del producto 4",
        price: 3.34,
        thumbnail: "path/imagen4.jpg",
        code: "fede101112",
        stock: 15,
    })
})();*/

// Probamos traer todos los tickets primero

//(async function () { console.log(await manager.getProducts()); })();


// Ahora probamos traer algunos por su id

//(async function () { console.log(await manager.getProductById(2)); })();

// Obtener un producto por un id inexistente
//manager.getProductById(100);


// Eliminar un producto por su id, descomentar para probar
(async function () { await manager.removeProductById(4) })();
//console.log(manager.getProducts());

//console.log(manager.getProducts());