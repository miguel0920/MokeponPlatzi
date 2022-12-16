const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const resultadoPelea = document.getElementById('resultado-pelea');
const ataqueDelJugador = document.getElementById('ataque-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');

const contenedorTarjetas = document.getElementById('contenedorTarjetas');

const contenedorPoderes = document.getElementById('contenedorPoderes');

let mokepones = [];
let opcionDeMokepon;
let opcionDePoder;
let ataqueJugador;
let ataqueEnemigo;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vidas) {
        this.nombre = nombre;
        this.foto = foto;
        this.vidas = vidas;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5);

hipodoge.ataques.push(
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' });

capipepo.ataques.push(
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' }
);

ratigueya.ataques.push(
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' });

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepon = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label for="${mokepon.nombre}" class="tarjeta-de-mokepon">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        `;

        contenedorTarjetas.innerHTML += opcionDeMokepon;
    });

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert('Selecciona una mascota');
    }

    extraerAtaque(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaque(mascotaJugador) {
    let ataques;
        mokepones.forEach(mokepone => {
            if (mokepone.id === mascotaJugador.id) {
                ataques = mokepone.ataques;
            }
        });

    mostrarAtaque(ataques);
}

function mostrarAtaque(ataques) {
    ataques.forEach((ataque) => {
        opcionDePoder = `
                    <button id="${ataque.id}" class="boton-de-ataque">${ataque.nombre}</button>
                `;
        contenedorPoderes.innerHTML += opcionDePoder;
    });
}


function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}
function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate();
}

function combate() {
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugaodor = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    resultadoPelea.innerHTML = resultado;
    nuevoAtaqueDelJugaodor.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugaodor);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    resultadoPelea.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);