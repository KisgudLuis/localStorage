
// 1. Recuperar usuarios de localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// 2. Obtener elementos del HTML
const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tablaUsuarios");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const eliminarTodos = document.getElementById("eliminarTodos");

// 3. Mostrar los usuarios al iniciar la página
mostrarUsuarios();

// 4. Registrar un usuario
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Obtener los datos
    let nombre = document.getElementById("nombre").value.trim();
    let clave = document.getElementById("clave").value.trim();

    // Verificar que los campos no estén vacíos
    if (nombre === "" || clave === "") {
        mostrarMensaje("Completa todos los campos", "red");
        return;
    }

    // Verificar si el nombre ya existe
    let existe = usuarios.some(function(usuario) {
        return usuario.nombre.toLowerCase() === nombre.toLowerCase();
    });

    if (existe) {
        mostrarMensaje("Este nombre ya está registrado", "red");
        return;
    }

    // Crear un objeto usuario
    let usuario = {
        nombre: nombre,
        clave: clave
    };

    // Agregar usuario al arreglo
    usuarios.push(usuario);

    // Guardar los datos en localStorage
    guardarUsuarios();

    // Actualizar la tabla
    mostrarUsuarios();

    // Limpiar formulario
    formulario.reset();

    mostrarMensaje("Usuario registrado correctamente", "green");

});

// 5. Guardar usuarios en localStorage
function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// 6. Mostrar usuarios en la tabla
function mostrarUsuarios() {

    tabla.innerHTML = "";

    usuarios.forEach(function(usuario, indice) {

        let fila = document.createElement("tr");

        // Crear celdas
        let celdaNumero = document.createElement("td");
        let celdaNombre = document.createElement("td");
        let celdaClave = document.createElement("td");
        let celdaAccion = document.createElement("td");

        celdaNumero.textContent = indice + 1;
        celdaNombre.textContent = usuario.nombre;
        celdaClave.textContent = "••••••";

        // Crear botón eliminar
        let boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.className = "btn-eliminar";

        boton.addEventListener("click", function() {
            eliminarUsuario(indice);
        });

        // Agregar botón a la celda
        celdaAccion.appendChild(boton);

        // Agregar celdas a la fila
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaClave);
        fila.appendChild(celdaAccion);

        // Agregar fila a la tabla
        tabla.appendChild(fila);

    });

    // Actualizar contador
    contador.textContent = "Total de usuarios: " + usuarios.length;

}

// 7. Eliminar un usuario
function eliminarUsuario(indice) {

    let confirmar = confirm("¿Deseas eliminar este usuario?");

    if (confirmar) {

        usuarios.splice(indice, 1);

        guardarUsuarios();

        mostrarUsuarios();

        mostrarMensaje("Usuario eliminado correctamente", "green");

    }

}

// 8. Eliminar todos los usuarios
eliminarTodos.addEventListener("click", function() {

    if (usuarios.length === 0) {
        mostrarMensaje("No hay usuarios para eliminar", "red");
        return;
    }

    let confirmar = confirm("¿Deseas eliminar todos los usuarios?");

    if (confirmar) {

        usuarios = [];

        guardarUsuarios();

        mostrarUsuarios();

        mostrarMensaje("Todos los usuarios fueron eliminados", "green");

    }

});

// 9. Mostrar mensajes
function mostrarMensaje(texto, color) {

    mensaje.textContent = texto;
    mensaje.style.color = color;

}