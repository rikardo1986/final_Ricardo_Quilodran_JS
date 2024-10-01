// Función para exportar y descargar el inventario como archivo JSON
function exportarInventarioJSON() {
    // Obtener el inventario desde localStorage
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];

    // Convertir el inventario a formato JSON
    const datosJSON = JSON.stringify(inventario, null, 2); // Formato con 2 espacios de indentación

    // Crear un blob con el contenido JSON
    const blob = new Blob([datosJSON], { type: 'application/json' });

    // Crear una URL para el blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = 'inventario.json'; // Nombre del archivo a descargar

    // Simular un clic en el enlace para iniciar la descarga
    enlaceDescarga.click();

    // Limpiar el objeto URL después de descargar
    URL.revokeObjectURL(url);
}

// Ejemplo de cómo llamar a la función (puedes usar un botón en tu HTML)
document.getElementById('exportarBoton').addEventListener('click', exportarInventarioJSON);
