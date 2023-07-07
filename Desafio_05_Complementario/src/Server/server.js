import express from 'express';
import mongoose from 'mongoose';
import fsroutes from "../Routes/routes.fs.js";
import mnroutes from "../Routes/routes.mongo.js"


const app = express()

const PORT = process.env.PORT || 8080


const connection = await mongoose.connect('mongodb+srv://giulianifederic0:fede43355@backend43355.w4nu7mi.mongodb.net/?retryWrites=true&w=majority')

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', fsroutes)
app.use('/apimongo', mnroutes)
app.use((req, res, next) => {
  res.status(404).send(`
                        <h1 style="text-align: center;">
                          { error: 404, message: ruta "${req.url}" no encontrada}
                        </h1>
                        <div>
                          <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="https://httpstatusdogs.com/404-not-found" alt="Error 404 page not found"/>
                        </div>
                      `)
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log(`El servidor a tenido un error:${err}`)
})
