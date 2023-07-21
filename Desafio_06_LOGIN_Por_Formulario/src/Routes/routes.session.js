import { Router } from "express";
import userManager from "../DAOs/mongo/manager/manager.user.mongo.js";

const userMongoRoutes = Router();

userMongoRoutes.get("/", async (req, res) => {
    try {
        const users = await userManager.getUsers();
        res.json({ status: 200, data: users });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});
userMongoRoutes.post("/register", async (req, res) => {
    try {
        const user = await userManager.createUser(req.body);
        res.send({ status: 200, payload: user });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});
userMongoRoutes.put("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const userData = req.body;
        const updatedUser = await userManager.updateUserByEmail(email, userData);
        res.json({ status: 200, data: updatedUser });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});
userMongoRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userManager.getUserByEmail(email, password);
        if (!user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" });

        if (req.session) {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email
            };
        } else {
            console.log("Error en la sesión");
        }

        res.status(200).send({ status: "success", message: "Inicio de sesión exitoso" });
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message });
    }
});





userMongoRoutes.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser = await userManager.deleteUser(email);
        res.json({ status: 200, data: deletedUser });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});

export default userMongoRoutes;