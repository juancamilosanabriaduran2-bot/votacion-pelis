import express from "express";

const app = express();
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

const movies = [
  { 
    id: 1,
    title: "Inception",
    description: "Una película de ciencia ficción dirigida por Christopher Nolan", 
    votes: 0 
    },
  { 
    id: 2, 
    title: "Titanic", 
    description: "Una película de drama dirigida por James Cameron", 
    votes: 0 
  },
  {
    id: 3,
    title: "The Matrix",
    description: "Película de acción y ciencia ficción dirigida por los hermanos Wachowski",
    votes: 0,
  }
];

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/result", (req, res) => {
  const resultados = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    votes: movie.votes,
  }));
  res.json(resultados);
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id == id);
  if (!movie) {
    return res
      .status(404)
      .json({ mensaje: `No existe la película con id ${req.params.id}` });
  }
  res.json(movie);
});

app.post("/vote/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id == id);
    if (!movie) {
    return res
        .status(404)        
        .json({ mensaje: `No existe la película con id ${req.params.id}` });
  }
  movie.votes++;
    res.json({ mensaje: `Voto registrado para la película ${movie.title}` });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ mensaje: `No existe la ruta ${req.method} ${req.url}` });
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto http://localhost:3001");
});
