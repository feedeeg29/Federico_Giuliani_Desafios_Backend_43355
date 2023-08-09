import { Router } from "express";
import userManager from "../DAOs/mongo/manager/manager.user.mongo.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils/utils.js"
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
        const hashedPassword = createHash(password);
        const user = await userManager.createUser({ ...req.body, role, password: hashedPassword });
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
        const user = await userManager.getUserByEmailAndPassword(email, password);
        //console.log(user)
        if (!user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" });


        const isPasswordValid = isValidPassword(user, password);

        if (!isPasswordValid) {
            return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
        }

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



userMongoRoutes.get("/github", passport.authenticate("github"), async (req, res) => { });

userMongoRoutes.get(
    "/githubcallback",
    passport.authenticate("github"),
    async (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

userMongoRoutes.get("/current", (req, res) => {
    if (req.isAuthenticated()) {

        const currentUser = req.user;
        res.status(200).json({ status: "success", user: currentUser });
    } else {
        res.status(401).json({ status: "error", message: "Usuario no autenticado" });
    }
});


export default userMongoRoutes;