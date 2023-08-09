import userModel from '../models/model.users.js';

class UserManager {
    async getUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (err) {
            throw new Error('Error al obtener todos los usuarios: ' + err.message);
        }
    }
    async createUser(userData) {
        try {
            const user = await userModel.create(userData);
            return user;
        } catch (err) {
            throw new Error('Error al crear el usuario: ' + err.message);
        }
    }
    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por su id: ' + err.message);
        }
    }
    async getUserByEmailAndPassword(email, password) {
        try {
            const user = await userModel.findOne({ email, password });
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por sus credenciales: ' + err.message);
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por su email: ' + err.message);
        }
    }


    async updateUserByEmail(email, userData) {
        try {
            const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { new: true });
            return updatedUser;
        } catch (err) {
            throw new Error('Error al actualizar el usuario: ' + err.message);
        }
    }


    async deleteUser(email) {
        try {
            const deletedUser = await userModel.findOneAndDelete({ email });
            return deletedUser;
        } catch (err) {
            throw new Error('Error al eliminar el usuario: ' + err.message);
        }
    }
}

export default new UserManager();
