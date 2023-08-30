import cartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';
import productManager from '../DAOs/mongo/manager/manager.products.mongo.js';
import { daoFactory } from '../DAOs/Factory/dao.factory.js';

export default class Actions {


    //carts
    async getAllCarts(req, res, query) {
        return this.dao.getAllCarts(req, res, query);
    }

    async getOneCart(req, res) {
        return this.dao.getOneCart(req.params.id);
    }

    async createCart(req, res) {
        return this.dao.createCart(req.body);
    }

    async addToCart(req, res) {
        return this.dao.addToCart(req.params.id, req.body.productID);
    }

    async removeFromCart(req, res) {
        return this.dao.removeFromCart(req.params.id, req.body.productID);
    }

    async updateCart(req, res) {
        return this.dao.updateCart(req.params.id, req.body.products);
    }

    async clearCart(req, res) {
        return this.dao.clearCart(req.params.id);
    }

    async deleteCart(req, res) {
        return this.dao.deleteCart(req.params.id);
    }

    //products
    async getAll(req, res, query) {
        return this.dao.getAll(req, res, query);
    }

    async getOne(req, res) {
        return this.dao.getOne(req.params.id);
    }

    async updateProduct(req, res) {
        return this.dao.updateProduct(req.params.id, req.body);
    }

    async deleteProduct(req, res) {
        return this.dao.deleteProduct(req.params.id);
    }

    //users
    async getAllUsers(req, res) {
        return this.dao.getUsers();
    }

    async createUser(req, res) {
        return this.dao.createUser(req.body);
    }

    async getUser(req, res) {
        return this.dao.getUserById(req.params.id);
    }

    async verifyUser(req, res) {
        return this.dao.getUserByEmailAndPassword(req.body.email, req.body.password);
    }

    async findUser(req, res) {
        return this.dao.getUserByEmail(req.body.email);
    }

    async updateUserByEmail(req, res) {
        return this.dao.updateUserByEmail(req.params.email, req.body.userData);
    }

    async deleteUser(req, res) {
        return this.dao.deleteUser(req.params.email);
    }
}
