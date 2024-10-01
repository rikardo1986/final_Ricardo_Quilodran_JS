// Inventario inicializado desde localStorage o vacío
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para validar si el usuario es "admin"
async function validarUsuario() {
    // Comprobar si ya hay una sesión iniciada en sessionStorage
    if (sessionStorage.getItem('sesionAdmin') === 'admin') {
        cargarContenido(); // Cargar directamente si la sesión ya está activa
        return;
    }

    const { value: password } = await Swal.fire({
        title: "Ingresa la contraseña",
        input: "password",
        inputLabel: "Contraseña",
        inputPlaceholder: "Ingresa la contraseña",
        inputAttributes: {
            maxlength: "10",
            autocapitalize: "off",
            autocorrect: "off"
        }
    });

    // Verificar si el valor ingresado es "admin"
    if (password === "admin") {
        // Guardar la sesión en sessionStorage
        sessionStorage.setItem('sesionAdmin', 'admin');

        Swal.fire('Bienvenido Administrador');
        cargarContenido(); // Llamada a la función para cargar el contenido
    } else {
        Swal.fire({
            icon: "error",
            title: 'Acceso Denegado',
            text: 'Contraseña de Administrador incorrecto. No tiene acceso.',
        }).then(() => {
            document.body.innerHTML = ''; // Vaciar el contenido del cuerpo después de que se cierre el SweetAlert
        });
    }
}

// Función para cargar el contenido solo si es admin
function cargarContenido() {
    // Mostrar el contenido solo si es administrador
    document.getElementById('contenido').style.display = 'block';
    cargarDatosDesdeJSON(); // Cargar los datos si se loguea correctamente
}

// Cargar datos desde JSON si el localStorage está vacío
function cargarDatosDesdeJSON() {
    if (inventario.length === 0) { // Solo cargar desde JSON si el inventario está vacío
        fetch('./productos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                inventario = data;
                guardarInventarioEnLocalStorage(); // Guardar el inventario actualizado en localStorage
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al cargar el JSON: ${error.message}`,
                });
            });
    }
}

// Función para guardar el inventario en localStorage
function guardarInventarioEnLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Inicialización de la página
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contenido').style.display = 'none'; // Ocultar el contenido al cargar
    validarUsuario(); // Validar usuario antes de mostrar contenido
});

// Función para cerrar la página al presionar "Salir"
document.getElementById('salirSistema').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro de que deseas salir del sistema?',
        text: "Esta acción cerrará la página.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Intentar cerrar la página
            window.close(); // Intenta cerrar la pestaña (puede no funcionar en navegadores modernos)
            
            // Si no se puede cerrar la pestaña, redirigir a una página vacía
            if (!window.closed) {
                window.location.href = 'about:blank'; // Redirigir a una página en blanco si no puedes cerrar la pestaña
            }
        }
    });
});
