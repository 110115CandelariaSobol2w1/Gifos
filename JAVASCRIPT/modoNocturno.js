let body = document.getElementById("body");
let url = window.location.pathname; //devuelve la ruta y el nombre del archivo de la pag actual
let darkModeStorage = localStorage.getItem("darkMode"); //creamos la key del local storage


let darkModeBtn = document.getElementById("menu-modo");
darkModeBtn.addEventListener('click', cambioModo);

//FUNCION CUANDO EL DARK MODE ESTA ACTIVADO 
let darkModeActivado = () => {
    body.classList.add('dark');
    darkModeBtn.innerHTML='modo diurno';

    localStorage.setItem("darkMode", "activado");
}

let darkModeDesactivado = () => {
    body.classList.remove('dark');
    darkModeBtn.innerHTML = 'modo nocturno';

    localStorage.setItem("darkMode", null);
}

if(darkModeStorage==="activado"){
    darkModeActivado();
}

//funcion para cambiar el modo
function cambioModo(){
    darkModeStorage=localStorage.getItem("darkMode");
    if(darkModeStorage!=="activado"){
        darkModeActivado();
    } else {
        darkModeDesactivado();
    }
}

