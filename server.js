import express from "express";

const app = express();
app.use(express.json());

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
  const resultados = movies
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      votes: movie.votes,
    }))
    .sort((a, b) => b.votes - a.votes);

  res.json(resultados);
});

app.get(["/movie/:id", "/movies/:id"], (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "El id no es válido." });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `No existe la película con id ${id}.` });
  }

  res.json(movie);
});

app.post("/vote/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "El id no es válido." });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `No existe la película con id ${id}.` });
  }

  movie.votes++;
  res.json({ message: "Voto registrado correctamente." });
});

app.post("/movies", (req, res) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof description !== "string" || !description.trim()) {
    return res.status(400).json({ message: "El título y la descripción son obligatorios." });
  }

  const id = movies.length ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
  const movie = { id, title: title.trim(), description: description.trim(), votes: 0 };

  movies.push(movie);
  res.status(201).json(movie);
});

app.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "El id no es válido." });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: `No existe la película con id ${id}.` });
  }

  const { title, description } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof description !== "string" || !description.trim()) {
    return res.status(400).json({ message: "El título y la descripción son obligatorios." });
  }

  movie.title = title.trim();
  movie.description = description.trim();

  res.json(movie);
});

app.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "El id no es válido." });
  }

  const index = movies.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `No existe la película con id ${id}.` });
  }

  if (movies[index].votes > 0) {
    return res.status(400).json({ message: "No se puede eliminar una película que ya tiene votos." });
  }

  movies.splice(index, 1);
  res.json({ message: "Película eliminada correctamente." });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `No existe la ruta ${req.method} ${req.url}` });
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto http://localhost:3001");
});
