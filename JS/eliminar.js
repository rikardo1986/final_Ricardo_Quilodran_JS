// Inventario inicializado desde localStorage o vacío
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para mostrar la información del producto
function mostrarProducto(producto) {
    return `
        Tipo: ${producto.tipo}
        Marca: ${producto.marca}
        Modelo: ${producto.modelo}
        Serie: ${producto.serie}
        MAC: ${producto.mac || "No disponible"}
        Almacenamiento: ${producto.almacenamiento || "No disponible"}
        Estado: ${producto.estado}
        Usuario: ${producto.usuario}
        Uso: ${producto.uso}
    `;
}

// Función para eliminar productos por número de serie
function eliminarProducto() {
    Swal.fire({
        title: 'Ingrese el número de serie',
        input: 'text',
        inputLabel: 'Número de serie',
        inputPlaceholder: 'Ingrese el número de serie del producto',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debe ingresar un número de serie.';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let buscarSerie = result.value;
            let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

            if (productoEncontrado) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: `¿Desea eliminar el producto con el número de serie ${buscarSerie}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                }).then((confirmacion) => {
                    if (confirmacion.isConfirmed) {
                        // Eliminar producto del inventario
                        inventario = inventario.filter(producto => producto.serie !== buscarSerie);
                        guardarInventarioEnLocalStorage(); // Actualizar localStorage

                        Swal.fire({
                            title: 'Producto eliminado',
                            html: `Producto eliminado correctamente:<br><br>${mostrarProducto(productoEncontrado).replace(/\n/g, '<br>')}`,
                            icon: 'success'
                        });
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Producto no encontrado',
                    text: `No se encontró un producto con el número de serie: ${buscarSerie}.`,
                });
            }
        }
    });
}

// Función para guardar el inventario en localStorage
function guardarInventarioEnLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Asignar la función al botón de eliminar
document.getElementById('eliminarBtn').addEventListener('click', eliminarProducto);
