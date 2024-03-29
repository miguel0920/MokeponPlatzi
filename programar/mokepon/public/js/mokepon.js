const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
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

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let botones = [];
let ataquesMokeponEnemigo = [];
let opcionDeMokepon;
let opcionDePoder;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let botonFuego;
let botonAgua;
let botonTierra;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let jugadorId = 0;
let enemigoId = 0;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = ('./assets/mokemap.png');
let alturaQueSeBusca;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 600;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueSeBusca = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueSeBusca;

class Mokepon {
    constructor(nombre, foto, vidas, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vidas = vidas;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

const HIPODOGE_ATAQUES = [
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' }
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' }
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-fuego', nombre: 'Fuego 🔥' },
    { id: 'boton-agua', nombre: 'Agua 💧' },
    { id: 'boton-tierra', nombre: 'Tierra 🌱' }
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    sectionVerMapa.style.display = 'none';

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
    botonReiniciar.addEventListener('click', reiniciarJuego);

    unirseAlJuego();
}

function unirseAlJuego() {
    fetch('http://192.168.80.14:8080/unirse')
        .then((res) => {
            if (res.ok) {
                res.text().then((respuesta) => {
                    jugadorId = respuesta;
                });
            }
        });
}

function seleccionarMascotaJugador() {

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
        return;
    }

    sectionSeleccionarMascota.style.display = 'none';

    seleccionarMokepon(mascotaJugador);

    extraerAtaque(mascotaJugador);
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.80.14:8080/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    });
}

function extraerAtaque(mascotaJugador) {
    let ataques;
    mokepones.forEach(mokepone => {
        if (mokepone.nombre === mascotaJugador) {
            ataques = mokepone.ataques;
            mascotaJugadorObjeto = mokepone;
        }
    });

    mostrarAtaque(ataques);
}

function mostrarAtaque(ataques) {
    ataques.forEach((ataque) => {
        opcionDePoder = `
                    <button id="${ataque.id}" class="boton-de-ataque button-ataque">${ataque.nombre}</button>
                `;
        contenedorPoderes.innerHTML += opcionDePoder;
    });

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');

    botones = document.querySelectorAll('.button-ataque');
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'Fuego 🔥') {
                ataqueJugador.push('FUEGO');
                boton.style.background = '#7e8aa1';
                boton.disabled = true;
            } else if (e.target.textContent === 'Agua 💧') {
                ataqueJugador.push('AGUA');
                boton.style.background = '#7e8aa1';
                boton.disabled = true;
            } else if (e.target.textContent == 'Tierra 🌱') {
                ataqueJugador.push('TIERRA');
                boton.style.background = '#7e8aa1';
                boton.disabled = true;
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques();
            }
        });
    });
}

function enviarAtaques() {
    fetch(`http://192.168.80.14:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    });

    intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
    fetch(`http://192.168.80.14:8080/mokepon/${enemigoId}/ataques`)
        .then((respuesta) => {
            if (respuesta.ok) {
                respuesta.json().then(({ataques}) => {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques;
                        combate();
                    }
                });
            }
        });
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    for (let ataque = 0; ataque < ataquesMokeponEnemigo.length; ataque++) {
        if (ataqueAleatorio === ataque) {
            if (ataquesMokeponEnemigo[ataque].nombre === 'Fuego 🔥') {
                ataqueEnemigo.push('FUEGO');
            } else if (ataquesMokeponEnemigo[ataque].nombre === 'Agua 💧') {
                ataqueEnemigo.push('AGUA');
            } else if (ataquesMokeponEnemigo[ataque].nombre == 'Tierra 🌱') {
                ataqueEnemigo.push('TIERRA');
            }
            break;
        }
    }
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    clearInterval(intervalo);

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("EMPATE");
        }
        else if ((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] == 'FUEGO') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] == 'AGUA')) {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVictorias();
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Empate');
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    resultadoPelea.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
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

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
    mokeponesEnemigos.forEach((mokeponEnemigo) => {
        mokeponEnemigo.pintarMokepon();
        colisionMokepon(mokeponEnemigo);
    });
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.80.14:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    }).then((respuesta) => {
        if (respuesta.ok) {
            respuesta.json()
                .then(({ enemigos }) => {
                    console.log(enemigos);
                    mokeponesEnemigos = enemigos.map((enemigo) => {
                        let mokeponEnemigo = null;
                        const mokeponNombre = enemigo.mokepon.nombre || '';
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id);
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id);
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id);
                        }
                        mokeponEnemigo.x = enemigo.x;
                        mokeponEnemigo.y = enemigo.y;

                        return mokeponEnemigo;
                    });
                });
        }
    });
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function precionarTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', precionarTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function colisionMokepon(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    detenerMovimiento();
    clearInterval(intervalo);
    enemigoId = enemigo.id;
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener('load', iniciarJuego);