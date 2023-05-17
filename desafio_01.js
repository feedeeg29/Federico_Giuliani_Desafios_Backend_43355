class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        // Validar que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        if (this.products.some((p) => p.code === product.code)) {
            console.log("Error: El código ya existe");
            return;
        }
        // Agregar el producto con un id autoincrementable
        product.id = this.nextId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.log(`Error: Producto con el id "${id}" no encontrado`);
        }
    }
    removeProductById(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            console.log("Producto eliminado correctamente");
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

// Prueba de funcionamiento, primero, creamos una instancia de ProductManager
const manager = new ProductManager();

// Agregamos productos para poder pobrar
manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "path/imagen1.jpg",
    code: "fede123",
    stock: 5,
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 234.30,
    thumbnail: "path/imagen2.jpg",
    code: "fede456",
    stock: 3,
});

manager.addProduct({
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 23.23,
    thumbnail: "path/imagen2.jpg",
    code: "fede789",
    stock: 8,
})

manager.addProduct({
    title: "Producto 4",
    description: "Descripción del producto 4",
    price: 3.34,
    thumbnail: "path/imagen4.jpg",
    code: "fede101112",
    stock: 15,
})

// Probamos traer todos los tickets primero

console.log(manager.getProducts());

// Ahora probamos traer algunos por su id

console.log(manager.getProductById(2));

// Obtener un producto por un id inexistente
manager.getProductById(100);


// Eliminar un producto por su id, descomentar para probar
//manager.removeProductById(1);
//console.log(manager.getProducts());