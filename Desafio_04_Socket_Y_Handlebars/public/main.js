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