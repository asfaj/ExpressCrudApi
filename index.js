const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());

const movies = [
  { title: "The Lion King", genre: "Animation" },
  { title: "Forrest Gump", genre: "Drama" },
  { title: "Finding Nemo", genre: "Family" }
];

server.get("/", function (req, res) {
  res.send("Welcome to the Movie API");
});

server.get("/api/movies", function (req, res) {
  res.send(movies);
});

server.get("/api/movies/:index", function (req, res) {
  const index = req.params.index;
  if (!movies[index])
    return res.status(404).send("Movie not found");
  res.send(movies[index]);
});

server.put("/api/movies/:index", function (req, res) {
  const index = req.params.index;
  if (!movies[index])
    return res.status(404).send("Movie not found");

  const updatedMovie = {
    title: req.body.title,
    genre: req.body.genre
  };

  movies[index] = updatedMovie;
  res.send(updatedMovie);
});

server.delete("/api/movies/:index", function (req, res) {
  const index = req.params.index;
  if (!movies[index])
    return res.status(404).send("Movie not found");

  movies.splice(index, 1);
  res.send(movies);
});

server.post("/api/movies", function (req, res) {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre
  };

  movies.push(newMovie);
  res.send(newMovie);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
