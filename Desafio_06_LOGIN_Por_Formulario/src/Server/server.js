import express from 'express';
import mongoose from 'mongoose';
import fsroutes from "../Routes/routes.fs.js";
import mnroutes from "../Routes/routes.mongo.js"
import viewsRoutes from "../Routes/routes.views.js"
import handlebars from 'express-handlebars'
import __dirname from '../utils/utils.js'
import path from 'path'
import cartMongoRoutes from '../Routes/cart.mongo.routes.js'
import userMongoRoutes from '../Routes/routes.session.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express()

const PORT = process.env.PORT || 8080


const connection = await mongoose.connect('mongodb+srv://giulianifederic0:fede43355@backend43355.w4nu7mi.mongodb.net/?retryWrites=true&w=majority')

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  store: new MongoStore({
    mongoUrl: 'mongodb+srv://giulianifederic0:fede43355@backend43355.w4nu7mi.mongodb.net/?retryWrites=true&w=majority',
    ttl: 7200,
  }),
  secret: 'f3d3s3cr3t',
  resave: false,
  saveUninitialized: false
}))


//handlebars config

app.engine("handlebars", handlebars.engine({ defaultLayout: 'home', extname: '.handlebars' }))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`public/errors`))
app.set("view engine", "handlebars")
app.set('views', path.join(__dirname, '..', 'views'));


//rutas para el front
app.use('/', viewsRoutes)
app.use('/products', viewsRoutes)
app.use('/addproducts', viewsRoutes)
app.use('/carts', viewsRoutes)
app.use('/products/product/:id', viewsRoutes)
app.use('/login', viewsRoutes)
app.use('/register', viewsRoutes)

//rutas backend-only
app.use('/apifs', fsroutes)
app.use('/apimongo', mnroutes)
app.use('/cartmongo', cartMongoRoutes)
app.use('/mongouser', userMongoRoutes)

app.use((req, res, next) => {
  /* solo descomentar este codigo durante las pruebas
  const youtubeURL = "https://youtu.be/7aMOurgDB-o?t=60"
  res.redirect(youtubeURL)*/
  res.status(404).render("404")
  /*`
                      <h1 style="text-align: center;">
                        error: 404, message: ruta "${req.url}" no encontrada
                      </h1>
                      <div>
                        <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="404.jpg" alt="Error 404 page not found"/>
                      </div>
                    `)*/
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log(`El servidor a tenido un error:${err}`)
})
