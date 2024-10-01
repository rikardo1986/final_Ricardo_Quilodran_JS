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

// Función para guardar el inventario en localStorage
function guardarInventarioEnLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para modificar productos
async function modificarProducto() {
    const { value: buscarSerie } = await Swal.fire({
        title: 'Buscar Producto',
        input: 'text',
        inputLabel: 'Ingrese el número de serie del producto que desea modificar:',
        inputPlaceholder: 'Número de serie',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debe ingresar un número de serie!';
            }
        }
    });

    let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

    if (productoEncontrado) {
        // Si el producto es encontrado, desplegar los campos para modificar
        const { value: formValues } = await Swal.fire({
            title: 'Modificar Producto',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Marca" value="${productoEncontrado.marca}">
                <input id="swal-input2" class="swal2-input" placeholder="Modelo" value="${productoEncontrado.modelo}">
                <input id="swal-input3" class="swal2-input" placeholder="MAC" value="${productoEncontrado.mac || ''}">
                <input id="swal-input4" class="swal2-input" placeholder="Almacenamiento" value="${productoEncontrado.almacenamiento || ''}">
                <input id="swal-input5" class="swal2-input" placeholder="Estado (Nuevo/Usado)" value="${productoEncontrado.estado}">
                <input id="swal-input6" class="swal2-input" placeholder="Usuario" value="${productoEncontrado.usuario}">
                <input id="swal-input7" class="swal2-input" placeholder="Uso" value="${productoEncontrado.uso}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value,
                    document.getElementById('swal-input6').value,
                    document.getElementById('swal-input7').value
                ];
            }
        });

        if (formValues) {
            // Asignar los valores actualizados al producto
            productoEncontrado.marca = formValues[0];
            productoEncontrado.modelo = formValues[1];
            productoEncontrado.mac = formValues[2];
            productoEncontrado.almacenamiento = formValues[3];
            productoEncontrado.estado = formValues[4];
            productoEncontrado.usuario = formValues[5];
            productoEncontrado.uso = formValues[6];

            // Guardar los cambios en localStorage
            guardarInventarioEnLocalStorage();

            // Confirmar la modificación exitosa
            Swal.fire({
                title: '¡Producto modificado correctamente!',
                html: mostrarProducto(productoEncontrado),
                icon: 'success'
            });
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Producto no encontrado.',
        });
    }
}

// Asignar el evento al botón
document.getElementById('modificarBtn').addEventListener('click', modificarProducto);
