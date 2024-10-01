// Inventario inicializado desde localStorage o vacío
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formProducto');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const tipo = document.getElementById('tipo').value;
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const serie = document.getElementById('serie').value;
        const mac = document.getElementById('mac').value || 'No especificado';
        const almacenamiento = document.getElementById('almacenamiento').value || 'No especificado';
        const estado = document.getElementById('estado').value;
        const usuario = document.getElementById('usuario').value;
        const uso = document.getElementById('uso').value;

        // Validar campos obligatorios
        if (!tipo || !marca || !modelo || !serie || !estado || !usuario || !uso) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios, excepto MAC y Almacenamiento.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Validar si el número de serie ya existe
        if (inventario.some(producto => producto.serie === serie)) {
            Swal.fire({
                title: 'Error',
                text: 'Ya existe un producto con ese número de serie.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Crear y agregar el nuevo producto
        const nuevoProducto = { tipo, marca, modelo, serie, mac, almacenamiento, estado, usuario, uso };
        inventario.push(nuevoProducto);

        // Guardar en localStorage
        localStorage.setItem('inventario', JSON.stringify(inventario));

        // Mostrar mensaje de éxito
        Swal.fire({
            title: '¡Éxito!',
            text: 'Producto agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    });

    // Evento para volver a la página anterior
    document.getElementById('volver').addEventListener('click', function() {
        window.location.href = '../index.html';
    });

    // Detectar si el usuario abandona la página y guardar cambios en localStorage
    window.addEventListener('beforeunload', function (event) {
        // Guardar el inventario en localStorage antes de abandonar
        localStorage.setItem('inventario', JSON.stringify(inventario));
    });
});
