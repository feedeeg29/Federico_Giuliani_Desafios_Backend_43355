import cartModel from "../models/model.carts.mongo.js";


class cartManager {
    getAllCarts = async () => {
        try {
            return await cartModel.find().lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    getOneCart = async (id) => {
        try {
            return await cartModel.findById(id).lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    createCart = async (cart) => {
        try {
            const newCart = new cartModel(cart);
            return await newCart.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    // Función para agregar un producto al carrito

    addToCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);

            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }

            // Guardar el carrito actualizado
            await cart.save();

            console.log('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }

    // Función para remover un producto del carrito
    removeFromCart = async (cartId, productId) => {
        try {
            // Buscar el carrito por su ID
            const cart = await cartModel.findById(cartId);

            // Encontrar el índice del producto en el array de items
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex !== -1) {
                // Si se encontró el producto, removerlo del array de items
                cart.items.splice(itemIndex, 1);

                // Guardar el carrito actualizado
                await cart.save();

                console.log('Producto removido del carrito');
            } else {
                console.log('El producto no existe en el carrito');
            }
        } catch (error) {
            console.error('Error al remover producto del carrito:', error);
        }
    }

    // Función para vaciar el carrito
    clearCart = async (cartId) => {
        try {
            // Buscar el carrito por su ID
            const cart = await cartModel.findById(cartId);

            // Vaciar el array de items
            cart.items = [];

            // Guardar el carrito actualizado
            await cart.save();

            console.log('Carrito vaciado');
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }
    deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}
export default cartManager


/*class cartManager {
    
    
    updateCart = async (id, newContent) => {
        try {
            const cart = await cartModel.findById(id);
            cart.products.push(newContent);
            return await cartModel.findByIdAndUpdate(id, cart, { new: true });

        } catch (err) {
            throw new Error(err);
        }
    }
    deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }

}*/