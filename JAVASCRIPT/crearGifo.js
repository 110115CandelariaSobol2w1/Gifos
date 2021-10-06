//Traemos todos los elementos que necesitamos en variables
const apiKey = "apqm2sZx8lShM1fBlnFdqKEb30l05tAE";
//Botones
let btnComenzar = document.getElementById("btn-comenzar");
let btnGrabar = document.getElementById("btn-grabar");
let btnFinalizar = document.getElementById("btn-finalizar");
let btnSubirGifo = document.getElementById("btn-subirGifo");
let btnDescargar = document.getElementById("btn-creargifo-descargar");

//Pasos
let paso1 = document.getElementById("paso1");
let paso2 = document.getElementById("paso2");
let paso3 = document.getElementById("paso3");

//Contador-repetir captura
let contador = document.getElementById("contador");
let repetirCaptura = document.getElementById("btn-repetir");
let imgCinta = document.getElementById("cinta");

let video = document.getElementById("grabacion-video");
let img_gif = document.getElementById("gifGrabado");
let stream, recorder, blob, info;
let segundos, minutos, horas, intervalo;
let form = new FormData();

//overlay

let overlayCargando = document.getElementById('overlay-video');
let iconoCargando = document.getElementById('overlay-video-icon');
let textoCargando = document.getElementById('overlay-video-parrafo');
let accionesCargando = document.getElementById('overlay-video-actions');
let overlayActions = document.getElementById('overlay-video-actions');
let misGifosArray = [];
let misGifosString = localStorage.getItem("misGifos");

document.getElementById("btn-comenzar").addEventListener("click", grabarGif);
//FUNCION COMENZAR 
function grabarGif() {
    let textoPrincipal = document.getElementById("tituloRecuadro");
    let parrafoPrincipal = document.getElementById("parrafoRecuadro");
    textoPrincipal.innerHTML = "¿Nos das acceso <br> a tu cámara?";
    parrafoPrincipal.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";

    paso1.classList.add("pasoActivo");

    //acceso a la camara
    var constraints = { audio: false, video: { width: 480, height: 320 } };
    navigator.mediaDevices.getUserMedia(constraints)

        .then(function (stream) {

            textoPrincipal.style.display = "none";
            parrafoPrincipal.style.display = "none";
            paso1.classList.remove("pasoActivo");
            paso2.classList.add("pasoActivo");
            btnComenzar.style.display = "none";
            btnGrabar.style.display = "block";

            //aparece el video
            video.style.display = "block";

            recorder = RecordRTC(stream, {
                type: 'gif'
            });
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            }
        }).catch(function (error) {
            alert('Debes permitir el acceso a la camara para grabar el gif');
            console.log(error);
        })

}
//FUNCION COMENZAR GRABACION
document.getElementById("btn-grabar").addEventListener("click", grabacionGif);

function grabacionGif() {

    btnGrabar.style.display = "none"
    btnFinalizar.style.display = "block"
    contador.style.display = "block"
    imgCinta.style.display = "none";

    recorder.startRecording();
    console.log("grabando gif");

    //calcular tiempo
    segundos = 00, minutos = 00, horas = 00;
    intervalo = setInterval(() => {
        segundos++;
        contador.innerHTML = segundos;
        if (segundos == 60) {
            minutos++;
            segundos = 00;
        }
        if (minutos == 60) {
            horas++
            minutos = 00;
        }
        contador.innerHTML = `${horas}:${minutos}:${segundos}`;
    }, 1000);
}


//FUNCION FINALIZAR GIF
document.getElementById("btn-finalizar").addEventListener("click", finalizarGif);

function finalizarGif() {
    video.style.display = "none";
    img_gif.style.display = "block";
    contador.style.display = "none"
    btnSubirGifo.style.display = "block";
    btnFinalizar.style.display = "none";
    repetirCaptura.style.display = "block";


    recorder.stopRecording(function () {
        blob = recorder.getBlob();
        form.append('file', blob, 'miGif.gif');
        form.append('api_key', apiKey);
        img_gif.src = URL.createObjectURL(blob);
    })
    console.log(form.get('file'));
}

//FUNCION REPETIR CAPTURA

document.getElementById("btn-repetir").addEventListener('click', repetirToma);

function repetirToma() {
    recorder.clearRecordedData();
    console.log("Repitiendo toma");
    repetirCaptura.style.display = "none";
    btnSubirGifo.style.display = "none";

    //sacamos el gif
    img_gif.style.display = "none";

    //btn grabar
    btnGrabar.style.display = "block";

    //funcion pedir acceso a la camara
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })

        .then(function (mediaStream) {

            //aparece el video
            video.style.display = "block";
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };

            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })

}

// FUNCION SUBIR GIF
document.getElementById("btn-subirGifo").addEventListener("click", subirGif);


function subirGif() {
    //Cambiamos los pasos activos
    paso2.classList.remove("pasoActivo");
    paso3.classList.add("pasoActivo");
    //eliminamos los botones y el repetir captura
    btnSubirGifo.style.display = "none";
    repetirCaptura.style.display = "none";
    overlayCargando.style.display = "flex";
    iconoCargando.style.display = "block";
    textoCargando.style.display = "block";

    fetch(`https://upload.giphy.com/v1/gifs`, {
        method: 'POST',
        body: form,
    })

        .then(response => {
            return response.json();
        })
        //6: gifo subido con exito: cambia icono y texto del overlay, aparecen los botones para descargar o link
        .then(objeto => {
            console.log(objeto);
            let miGifId = objeto.data.id;

            //muestro elementos del DOM subiendo gifo
            accionesCargando.style.display = "block";
            iconoCargando.setAttribute("src", "/assets/check.svg");
            textoCargando.innerText = "GIFO subido con éxito";
            overlayActions.innerHTML =
            `<div class: "botonesHover">
                <button class="overlay-video-button" id="btn-creargifo-descargar" onclick="descargarGif('${miGifId}')">
                   <img src="/assets/icon-download.svg" alt="download">
                </button>
               <button class="overlay-video-button" id="btn-creargifo-link">
                 <img src="/assets/icon-link.svg" alt="link">
                </button>
            </div>`;
                

            //si en el local storage no hay nada, el array queda vacio
            if (misGifosString == null) {
                misGifosArray = [];

            } else {
                //si tengo contenido, necesito parsearlo para agregar uno nuevo
                misGifosArray = JSON.parse(misGifosString);
            }

            misGifosArray.push(miGifId);
            //vuelvo a pasar a texto el array para subirlo al LS
            misGifosString = JSON.stringify(misGifosArray);
            localStorage.setItem("misGifos", misGifosString);
        })



}

//FUNCION DESCARGAR
async function descargarGif(gifImg) {
    let blob = await fetch(gifImg).then(img => img.blob());;
    invokeSaveAsDialog(blob, "migif.gif");
}




