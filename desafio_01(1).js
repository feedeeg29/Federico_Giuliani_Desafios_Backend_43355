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
            console.log("Error: Producto no encontrado");
        }
    }
}

// Ejemplo de uso:
const manager = new ProductManager();

// Agregar productos
manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "ruta/imagen1.jpg",
    code: "ABC123",
    stock: 5,
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 19.99,
    thumbnail: "ruta/imagen2.jpg",
    code: "DEF456",
    stock: 3,
});

// Obtener todos los productos

console.log(manager.getProducts());

// Obtener un producto por su id

console.log(manager.getProductById(2));

// Obtener un producto por un id inexistente
const nonExistingProduct = manager.getProductById(100);