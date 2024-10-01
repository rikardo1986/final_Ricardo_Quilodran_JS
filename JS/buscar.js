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

// Función para buscar productos por usuario
function buscarProductoPorUsuario() {
    let usuarioBuscado = document.getElementById('usuarioBusqueda').value;
    if (!usuarioBuscado) {
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese el usuario',
            text: 'Debe ingresar un nombre de usuario para buscar.',
        });
        return;
    }

    let productosUsuario = inventario.filter(producto => producto.usuario === usuarioBuscado);

    if (productosUsuario.length > 0) {
        let resultado = `Productos encontrados para el usuario ${usuarioBuscado}:<br>`;
        productosUsuario.forEach((producto, index) => {
            resultado += `<strong>Producto ${index + 1}:</strong><br>${mostrarProducto(producto).replace(/\n/g, '<br>')}<br><br>`;
        });

        Swal.fire({
            title: 'Resultados de la búsqueda',
            html: resultado,
            icon: 'success'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sin resultados',
            text: `No se encontraron productos para el usuario: ${usuarioBuscado}.`,
        });
    }
}

// Asignar la función al botón de buscar
document.getElementById('buscarBtn').addEventListener('click', buscarProductoPorUsuario);
