/*
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal con comparación de método y URL
app.use((req, res, next) => {
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      mensaje: 'API Aventuras San Gil funcionando'
    }));
  } else {
    next();
  }
});

// Ruta GET con res.json()
app.get('/aventuras', (req, res) => {
  res.json({
    mensaje: 'Lista de aventuras',
    aventuras: ['Rafting', 'Senderismo', 'Espeleología']
  });
});

// Ruta POST para recibir datos
app.post('/aventuras', (req, res) => {
  res.status(201).json({
    mensaje: 'Aventura recibida correctamente',
    datos: req.body
  });
});

// Ruta que no existe: error 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
*/
import express from "express";

const app = express();
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

//middleware, imprime la fecha y lo que pidió el usuario y la URL. el next permite que continue con la ejecución del código, si no se pone next() se queda en el middleware y no ejecuta lo demás.
const actividades = [
  { id: 1, nombre: "Rafting en el río Fonce", tipo: "agua", precio: 60000 },
  { id: 2, nombre: "Parapente en el cañón", tipo: "aire", precio: 180000 },
  {
    id: 3,
    nombre: "Caminata Camino Real a Barichara",
    tipo: "tierra",
    precio: 0,
  },
  { id: 4, nombre: "Torrentismo en cascada", tipo: "agua", precio: 70000 },
];

//jhsjsjhshssjh
app.use(express.json());

app.post("/actividades", (req, res) => {
  const { nombre, tipo, precio } = req.body;
  const faltantes = [];
  if (!nombre) faltantes.push("nombre");
  if (!tipo) faltantes.push("tipo");
  if (faltantes.length > 0) {
    return res.status(400).json({
      error: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}.`,
    });
  }
  if (typeof precio !== "number" || Number.isNaN(precio) || precio < 0) {
    return res.status(400).json({
      error: "El campo precio debe ser un número válido mayor o igual a cero.",
    });
  }
  const nueva = {
    id: actividades.length + 1,
    nombre,
    tipo,
    precio,
  };
  actividades.push(nueva);
  return res.status(201).json(nueva);
});

app.get("/actividades/gratis", (req, res) => {
  const gratis = actividades.filter((a) => a.precio == 0);
  res.json({ gratis });
});

app.get("/actividades/:id", (req, res) => {
  const id = Number(req.params.id);
  const actividad = actividades.find((a) => a.id == id);
  if (!actividad) {
    return res
      .status(404)
      .json({ mensaje: `No existe la actividad con id ${req.params.id}` });
  }
  res.json(actividad);
});
//Predicción P12: escríbela debajo de la ruta /actividades/:id y prueba. ¿Qué responde? Explica
//por qué y corrígelo sin cambiar la URL.

//RTA: Al colocarla debajo, lee primero la ruta del id, por lo que va a esperar un id despues de /actividades,
//por lo que va a arrojar un error404.

app.get("/actividades", (req, res) => {
  let resultado = actividades;
  const { precioMax } = req.query;
  if (precioMax !== undefined) {
    const limite = Number(precioMax);
    if (Number.isNaN(limite)) {
      return res.status(400).json({
        error: "El parámetro precioMax debe ser un valor numérico válido.",
      });
    }
    resultado = actividades.filter((actividad) => actividad.precio <= limite);
  }
  return res.status(200).json(resultado);
});

app.get("/actividades", (req, res) => {
  console.log("query:", req.query);
  const { tipo } = req.query;
  if (!tipo) {
    return res.json(actividades);
  }
  const filtradas = actividades.filter((a) => a.tipo == tipo.toLowerCase());
  res.json(filtradas);
});

app.get("/actividades", (req, res) => {
  res.json(actividades);
});

//R1
app.get("/estado", (req, res) => {
  res.json({
    servidor: "Ok",
    hora:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds() +
      " y " +
      new Date().toLocaleDateString(),
    totalActividades: actividades.length,
  });
});

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.get("/actividad", (req, res) => {
  res.json({ mensaje: "holis" });
});

app.post("/actividad", (req, res) => {
  res.send("Esto es un post llamado actividad");
});

// SIEMPRE de último, después de todas las rutas
app.use((req, res) => {
  res
    .status(404)
    .json({ mensaje: `No existe la ruta ${req.method} ${req.url}` });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto http://localhost:3000");
});
