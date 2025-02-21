// Lista de invitados con sus cupos asignados
const invitados = {
    "anadossantos": { nombre: "Ana dos Santos", telefono: "095608354", cupos: 5 },
    "makinsondossantos": { nombre: "Makinson dos Santos", telefono: "095608348", cupos: 1 },
    "sandradossantos": { nombre: "Sandra dos Santos", telefono: "096112224", cupos: 2 },
    "fanygomez": { nombre: "Fany Gomez", telefono: "097929465", cupos: 1 },
    "mirthagomez": { nombre: "Mirtha Gomez", telefono: "098265107", cupos: 1 },
    "mirianlemos": { nombre: "Mirian Lemos", telefono: "091960397", cupos: 3 },
    "claudialemos": { nombre: "Claudia Lemos", telefono: "84376566", cupos: 5 },
    "teresalemos": { nombre: "Teresa Lemos", telefono: "095025208", cupos: 1 },
    "nellylemos": { nombre: "Nelly Lemos", telefono: "094169819", cupos: 2 },
    "isabellemos": { nombre: "Isabel Lemos", telefono: "99119520", cupos: 2 },
    "marcialemos": { nombre: "Marcia Lemos", telefono: "91935095", cupos: 2 },
    "gustavolemos": { nombre: "Gustavo Lemos", telefono: "099195234", cupos: 5 },
    "hugolemos": { nombre: "Hugo Lemos", telefono: "091502299", cupos: 4 },
    "yanelemos": { nombre: "Yane Lemos", telefono: "099795888", cupos: 3 },
    "mireyalemos": { nombre: "Mireya Lemos", telefono: "091649145", cupos: 1 },
    "cecilialemos": { nombre: "Cecilia Lemos", telefono: "098864994", cupos: 3 },
    "rosanaramos": { nombre: "Rosana Ramos", telefono: "099526255", cupos: 5 },
    "carinaramos": { nombre: "Carina Ramos", telefono: "099751723", cupos: 3 },
    "fanyalmeida": { nombre: "Fany Almeida", telefono: "099932002", cupos: 2 },
    "irisalmeida": { nombre: "Iris Almeida", telefono: "091551702", cupos: 3 },
    "leticiagutierrez": { nombre: "Leticia Gutierrez", telefono: "097194792", cupos: 6 },
    "gustavomello": { nombre: "Gustavo Mello", telefono: "99754570", cupos: 5 },
    "tamaramello": { nombre: "Tamara Mello", telefono: "093876979", cupos: 4 },
    "deliairigaray": { nombre: "Delia Irigaray", telefono: "097038076", cupos: 2 },
    "soniafigueroa": { nombre: "Sonia Figueroa", telefono: "095511703", cupos: 2 },
    "jazminrivero": { nombre: "Jazmin Rivero", telefono: "098062436", cupos: 3 },
    "lorenawilkins": { nombre: "Lorena Wilkins", telefono: "094971599", cupos: 5 },
    "marciarodriguez": { nombre: "Marcia Rodríguez", telefono: "095608377", cupos: 5 },
    "naraolivera": { nombre: "Nara Olivera", telefono: "093363063", cupos: 2 },
    "marlenribeiro": { nombre: "Marlene Ribeiro", telefono: "97037194", cupos: 2 },
    "mariapereira": { nombre: "María Pereira", telefono: "91756940", cupos: 1 },
    "patriciapereira": { nombre: "Patricia Pereira", telefono: "099888693", cupos: 2 },
    "jorgebuere": { nombre: "Jorge buere", telefono: "099601717", cupos: 1 },
    "emanuelmorales": { nombre: "Emanuel Morales", telefono: "098861371", cupos: 1 },
    "celiadarosa": { nombre: "Celia da Rosa", telefono: "091324955", cupos: 1 },
    "flaviavieira": { nombre: "Flavia Vieira", telefono: "092988314", cupos: 1 },
    "elisaarriola": { nombre: "Elisa Arriola", telefono: "095753429", cupos: 1 },
    "isaurafrias": { nombre: "Isaura Frías", telefono: "46223641", cupos: 1 },
    "biancarodriguez": { nombre: "Bianca Rodríguez", telefono: "092789970", cupos: 1 },
    "albertomoreno": { nombre: "Alberto Moreno", telefono: "098743203", cupos: 1 },
    "fernandavalbuena": { nombre: "Fernanda Valbuena", telefono: "091208406", cupos: 3 },
};

const CLAVE_ADMIN = "Luciana15";  // 🔒 Cambia esto por tu contraseña

// Función para buscar el invitado por nombre o número
function buscarInvitado(event) {
    event.preventDefault(); // Evitar recarga de página

    let input = document.getElementById("nombre").value.trim();

    if (input === "") {
        alert("Por favor, ingrese su nombre o teléfono.");
        return;
    }

    // Verificar si el input es un número de teléfono
    let invitadoEncontrado = null;

    for (let clave in invitados) {
        // Si el input es un número de teléfono
        if (invitados[clave].telefono === input || clave === input) {
            invitadoEncontrado = invitados[clave];
            break;
        }
    }

    // Verificar si se encontró el invitado
    if (invitadoEncontrado) {
        // Guardar el nombre y los cupos en localStorage
        localStorage.setItem("nombre", invitadoEncontrado.nombre);
        localStorage.setItem("cupos", invitadoEncontrado.cupos);

        // Ocultar la primera sección y mostrar la segunda
        document.getElementById("pagina1").style.display = "none";
        document.getElementById("pagina2").style.display = "block";

        // Actualizar el saludo y los cupos disponibles
        document.getElementById("nombreInvitado").textContent = invitadoEncontrado.nombre;
        document.getElementById("cupos").textContent = invitadoEncontrado.cupos;
    } else {
        alert("Nombre o teléfono no encontrado en la lista de invitados.");
    }
}

// Función para guardar la confirmación de asistencia y enviar a Formspree
function guardarConfirmacion(event) {
    event.preventDefault(); // Evitar recarga de página

    const asistencia = document.querySelector('input[name="asistencia"]:checked');
    const lugares = parseInt(document.getElementById("lugaresConfirmados").value);

    if (!asistencia || isNaN(lugares)) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Obtener los lugares disponibles para el invitado desde localStorage
    const cuposDisponibles = parseInt(localStorage.getItem("cupos"));

    if (lugares > cuposDisponibles) {
        alert("No puedes confirmar más lugares de los disponibles.");
        return;
    }

    // Enviar los datos a Formspree
    const formData = new FormData();
    formData.append("nombre", localStorage.getItem("nombre"));
    formData.append("asistencia", asistencia.value);
    formData.append("lugares", lugares);

    fetch("https://formspree.io/f/mjvqdbjq", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar agradecimiento
        document.getElementById("pagina2").style.display = "none";
        document.getElementById("pagina4").style.display = "block";
        document.getElementById("mensajeGracias").textContent = "Gracias por confirmar tu asistencia.";
        document.getElementById("detalleGracias").textContent = `¡Nos vemos en mis quince años, ${localStorage.getItem("nombre")}!`;

        // Limpiar localStorage
        localStorage.removeItem("nombre");
        localStorage.removeItem("cupos");
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un error al enviar tu confirmación. Por favor, intenta nuevamente.");
    });
}

// Añadir eventos
document.getElementById("continuarBtn").addEventListener("click", buscarInvitado);
document.getElementById("confirmarBtn").addEventListener("click", guardarConfirmacion);
