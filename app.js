const express = require("express");
const port =process.env.PORT || 4000;
const createError = require("http-errors");
const cors = require("cors");
const { auth } = require("./middlewares/Auth")
require('dotenv').config()

const moviesRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

// I Used API_KEY 
const URL =
  "https://api.themoviedb.org/3/movie/550?api_key={API_KEY}";

require("./mongooseConnection");
const app = express();

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", auth, moviesRoutes);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("NetflixClone-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "NetflixClone-frontend", "build", "index.html"));
  });
}



app.use((req, res, next) => {
  let err = createError(404, "pagenotfound");
  next(err);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});



app.listen(port, () =>
  console.log(`express server is running on port: ${port}`)
);
