//Instaciamos el server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); //socket.io
const hbs = require('express-handlebars'); //handlebars
const PORT = 3000;
const router = require('./Routes/routes');

app.use('/', router);

//config hbs
app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));

//socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('addProduct', async (product) => {
        await manager.addProduct(product);
        socket.emit('productAdded', product);
    });
    socket.on('deleteProduct', async (productId) => {
        await manager.removeProductById(productId);
        socket.emit('productrRemoved', productId);
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});




const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
server.on('error', (error) => {
    console.log('error en el servidor:', error);
}
);