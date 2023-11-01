const express = require("express");
const app = express();

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const db = null;

const dbPath = path.join(__dirname, "moviesData.db");
const initializeDBAndPath = async () => {
  try {
    db = open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running successfully");
    });
  } catch (e) {
    console.log(`Database error is ${e.message}`);
  }
};

const convertToAPI = (eachMovie) => {
  return {
    movieName: eachMovie.movie_name,
  };
};

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `SELECT movie_name FROM movie`;
  const allMovies = await db.all(getMoviesQuery);
  request.send(allMovies.map((eachMovie) => convertToAPI(eachMovie)));
});

module.exports = app;
