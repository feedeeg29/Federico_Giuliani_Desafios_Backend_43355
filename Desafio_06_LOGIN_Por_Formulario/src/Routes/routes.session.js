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
        const { email, password } = req.body;
        let role = 'user';
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            role = 'admin';
        }

        const user = await userManager.createUser({ ...req.body, role });
        res.send({ status: 'success', payload: user });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});


// actualizar un usuario -- email requerido
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

// Iniciar sesion
userMongoRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userManager.getUserByEmail(email, password);
        //console.log(user)
        if (!user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" });

        if (req.session) {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role,
            };
        } else {
            console.log("Error en la sesión");
        }

        res.status(200).send({ status: "success", message: "Inicio de sesión exitoso" });
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message });
    }
});



// Cerrar sesion
userMongoRoutes.post("/logout", (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.json({ status: 500, err: err.message });
            } else {
                res.sendStatus(200);
            }
        });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});

//Eliminar un usurio -- Email requerido
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