// Escuchar evento 'updateProducts' y actualizar la lista de productos
socket.on('updateProducts', (products) => {
    // Actualizar la lista en la vista home
    if (window.location.pathname === '/') {
        updateProductList(products);
    }
    // Actualizar la lista en la vista realTimeProducts
    if (window.location.pathname === '/realtimeproducts') {
        updateProductList(products);
    }
});

// Función para actualizar la lista de productos en la vista
function updateProductList(products) {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';

    for (const product of products) {
        const listItem = document.createElement('li');
        listItem.textContent = product.title;
        productList.appendChild(listItem);
    }
}

function removeProduct(productId) {
    fetch(`/products/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // Actualizar la lista de productos en la vista si la eliminación fue exitosa
                // Puedes agregar tu lógica personalizada aquí
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
}