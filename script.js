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

function showIluluGif() {
    ilulugif.classList.remove("hidden");
    lucoagif.style.display = "none";
}

function showLucoaGif() {
    lucoagif.style.display = "block";
    ilulugif.classList.add("hidden");
}

function filterInput(text) {
    return text.replace(/[^a-z]/g, '');
}

textarea.addEventListener("input", (e) => {
    imgtohruu.style.display = "none";
    showIluluGif();
    resultadodetitulo.textContent = "Capturando mensaje";
    oculttext.textContent = "";
});

botonencriptarxd.addEventListener("click", (e) => {
    let mensaje = textarea.value.toLowerCase();
    mensaje = filterInput(mensaje); 
    let mensajeEncriptado = encriptarmensaje(mensaje);
    oculttext.textContent = mensajeEncriptado;
    botoncopiar.classList.remove("hidden");
    resultadodetitulo.textContent = "El resultado es";
});

botondesencriptarxd.addEventListener("click", (e) => {
    let mensaje = textarea.value.toLowerCase();
    mensaje = filterInput(mensaje); 
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
    });
});
