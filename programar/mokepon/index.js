import express from 'express';
import cors from 'cors';

const app = express();
//Ingresar desde Linux o Mac.
//Correr el comando: HostName
//http://{HostName}.local:8080
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
    }

    asignarUnMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarUbicacionDelMokepon(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

app.get('/unirse', (req, res) => {
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.send(id);
});

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const nombre = req.body.mokepon || '';
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarUnMokepon(mokepon);
    }
    res.end();
});

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarUbicacionDelMokepon(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

    res.send({
        enemigos
    });
});

app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const ataques = req.body.ataques || [];

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques);
    }

    res.send({
        enemigos
    });
});

app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
    if (jugador !== null) {
        res.send({
            ataques: jugador.ataques || []
        });
    }
    res.send({
        ataques: []
    });
});

app.listen(8080, () => {
    console.log('En escucha');
});