const d = document;
const textarea = d.querySelector(".form__input");
const imgtohruu = d.querySelector(".resultado__tohru");
const ilulugif = d.querySelector(".ilulu");
const lucoagif = d.querySelector(".lucoa");
const resultadodetitulo = d.querySelector(".resultado__title");
const oculttext = d.querySelector(".resultado__text");
const botonencriptarxd = d.querySelector(".bot[value='Encriptar']");
const botondesencriptarxd = d.querySelector(".bot[value='Desencriptar']");
const botoncopiar = d.querySelector(".botcop");

// Define la expresión regular para letras con acentos y caracteres especiales
const regexNoPermitidos = /[^a-z\s]/g;

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encriptarmensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptar = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptar = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptar;
    }
    return mensajeEncriptado;
}

function desencriptarmensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Muestra el gif de Ilulu y oculta el de Lucoa
function showIluluGif() {
    ilulugif.classList.remove("hidden");
    lucoagif.style.display = "none";
}

function showLucoaGif() {
    lucoagif.style.display = "block";
    ilulugif.classList.add("hidden");
}

// Limpia el texto eliminando caracteres no permitidos
function limpiarTexto(mensaje) {
    return mensaje.replace(regexNoPermitidos, '');
}

let resetTimeout; // Variable para almacenar el ID del temporizador

textarea.addEventListener("input", (e) => {
    imgtohruu.style.display = "none";
    showIluluGif();
    resultadodetitulo.textContent = "Capturando mensaje";
    oculttext.textContent = "";
    
    // Si hay un temporizador en curso, cancélalo
    if (resetTimeout) {
        clearTimeout(resetTimeout);
    }
});

botonencriptarxd.addEventListener("click", (e) => {
    let mensaje = textarea.value.toLowerCase();
    if (mensaje.trim() === "") {
        return; // No hacer nada si el textarea está vacío
    }
    mensaje = limpiarTexto(mensaje);
    let mensajeEncriptado = encriptarmensaje(mensaje);
    oculttext.textContent = mensajeEncriptado;
    botoncopiar.classList.remove("hidden");
    resultadodetitulo.textContent = "El resultado es";
});

botondesencriptarxd.addEventListener("click", (e) => {
    let mensaje = textarea.value.toLowerCase();
    if (mensaje.trim() === "") {
        return; // No hacer nada si el textarea está vacío
    }
    mensaje = limpiarTexto(mensaje);
    let mensajeDesencriptado = desencriptarmensaje(mensaje);
    oculttext.textContent = mensajeDesencriptado;
    botoncopiar.classList.remove("hidden");
    resultadodetitulo.textContent = "El resultado es";
});

botoncopiar.addEventListener("click", () => {
    let textoCopiado = oculttext.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        showLucoaGif();
        resultadodetitulo.textContent = "Texto copiado";
        botoncopiar.classList.add("hidden");
        textarea.value = "";

        // Vuelve a mostrar el estado inicial después de 3 segundos
        resetTimeout = setTimeout(() => {
            imgtohruu.style.display = "block";
            lucoagif.style.display = "none";
            resultadodetitulo.textContent = "Ningún mensaje fue encontrado";
            oculttext.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
            botoncopiar.classList.add("hidden");
        }, 3000);
    });
});

