import passport from "passport";
import CartManager from '../DAOs/mongo/manager/carts/manager.carts.mongo.js';
import ProductManager from '../DAOs/mongo/manager/products/manager.products.mongo.js';
import UserManager from '../DAOs/mongo/manager/users/manager.user.mongo.js';
import { developmentLogger } from '../utils/Logger/logger.js';

class ActionsMongo {
    // Métodos de productos
    static async renderAllProducts(req, res) {
        try {
            const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await ProductManager.getAll(req, res, req.query);
            res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage });
            //return data
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }

    static async getAll(req, res) {
        try {
            const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await ProductManager.getAll(req, res, req.query);
            return ({ data: products, hasNextPage, hasPrevPage, nextPage, prevPage });
            //return data
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }

    static async getOne(req, res) {
        try {
            const product = await ProductManager.getOne(req.params.id);
            res.render('product', { product });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }

    static async createProduct(req, res) {
        try {
            const { name, description, code, thumbnail, price, stock } = req.body;
            if (!name || !description || !code || !thumbnail || !price || !stock) {
                return res.json({ status: 400, err: "Faltan datos" })
            }
            const newProduct = await ProductManager.createProduct({ name, description, code, thumbnail, price, stock });
            console.log(newProduct) // Usar req.body en lugar de product
            res.status(201).json({ status: 'success', message: 'Producto creado con éxito', data: newProduct });
        } catch (error) {
            developmentLogger.fatal(error)
            res.json({ status: 'error', message: 'No se pudo crear el producto', error: error.message });
        }
    }




    // Métodos de carritos
    static async getAllCarts(req, res) {
        try {
            const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await CartManager.getAllCarts(req, res, req.query);
            //console.log(carts)
            return ({ status: 200, data: carts, hasNextPage, hasPrevPage, nextPage, prevPage });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }
    static async renderAllCarts(req, res) {
        try {
            const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await CartManager.getAllCarts(req, res, req.query);
            //console.log(carts)
            res.render('carts', { status: 200, data: carts, hasNextPage, hasPrevPage, nextPage, prevPage });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }
    static async getOneCart(req, res) {
        try {
            const cart = await CartManager.getOneCart(req.params.id);
            //console.log(cart)
            return cart
        } catch (err) {
            developmentLogger.fatal(err)

            res.json({ status: 500, err: err.message });
        }
    }



    // Métodos de autenticación (manejo de usuarios)
    static async registerUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserManager.createUser({ email, password });
            res.json({ status: 'success', payload: user });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }
    static async getUserByEmail(email) {
        return UserManager.getUserByEmail(email)
    }
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserManager.getUserByEmailAndPassword(email, password);

            if (!user) {
                return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
            }

            if (req.session) {
                req.session.user = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role: user.role,
                };
            } else {
                developmentLogger.error("Error en la sesión");
            }

            res.status(200).send({ status: "success", message: "Inicio de sesión exitoso" });
        } catch (err) {
            res.status(500).send({ status: "error", error: err.message });
        }
    }

    static async logoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.json({ status: 500, err: err.message });
                } else {
                    res.sendStatus(200);
                }
            });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const email = req.params.email;
            const userData = req.body;
            const updatedUser = await UserManager.updateUserByEmail(email, userData);
            res.json({ status: 200, data: updatedUser });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const email = req.params.email;
            const deletedUser = await UserManager.deleteUser(email);
            res.json({ status: 200, data: deletedUser });
        } catch (err) {
            developmentLogger.fatal(err)
            res.json({ status: 500, err: err.message });
        }
    }
    static async authenticateGithub(req, res, next) {
        passport.authenticate("github")(req, res, next);
    }
    static async githubCallback(req, res, next) {
        passport.authenticate("github", async (err, user) => {
            if (err) {
                developmentLogger.warning(err)
                console.error("Error en autenticación de GitHub:", err);
                return res.status(500).json({ status: "error", message: "Error en autenticación de GitHub" });
            }

            req.session.user = user;
            res.redirect("/");
        })(req, res, next);
    }

    static async getCurrentUser(req, res) {
        if (req.session.user) {
            const currentUser = req.session.user;
            res.status(200).json({ status: "success", user: currentUser });
        } else {
            developmentLogger.warning(err)
            res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        }
    }
    static async finishPurchase() {
        try {
            const cartId = req.params.cid;
            const cart = await CartManager.getOneCart(cartId);

            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }

            const { purchasedProducts, notPurchasedProducts } = await CartManager.purchaseCart(cart);

            if (purchasedProducts.length > 0) {
                const ticketData = {
                    userId: req.session.user._id,
                    products: purchasedProducts.map(product => product._id),
                };
                await TicketService.createTicket(ticketData);
            }

            res.status(200).json({ status: 'success', purchased: purchasedProducts, notPurchased: notPurchasedProducts });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    };
}






export default ActionsMongo;
