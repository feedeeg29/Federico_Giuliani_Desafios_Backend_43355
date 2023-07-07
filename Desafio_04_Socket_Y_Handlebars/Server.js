//Instaciamos el server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); //socket.io
const handlebars = require('express-handlebars'); //handlebars
const PORT = 3000;
const router = require('./Routes/routes');
const path = require('path');

app.use('/', router);

//config hbs
app.engine(
    'handlebars',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.handlebars',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


//socket.io
io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("addProduct", async (product) => {
        await manager.addProduct(product);
        socket.emit("productAdded", product);
    });

    socket.on("deleteProduct", async (productId) => {
        await manager.removeProductById(productId);
        socket.emit("productRemoved", productId);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});



const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
server.on('error', (error) => {
    console.log('error en el servidor:', error);
}
);