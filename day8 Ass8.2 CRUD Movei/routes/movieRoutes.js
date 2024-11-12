const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Create a Movie
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Movies with Filtering, Sorting, and Pagination
router.get("/", async (req, res) => {
  const { q, genre, minRating, sortBy, page = 1, limit = 10 } = req.query;

  const filter = {};

  if (q) filter.title = { $regex: q, $options: "i" }; // Search by title
  if (genre) filter.genre = genre; // Filter by genre
  if (minRating) filter.rating = { $gte: Number(minRating) }; // Filter by minimum rating

  try {
    const movies = await Movie.find(filter)
      .sort(sortBy ? { [sortBy]: 1 } : {}) // Sort by field
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Single Movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Movie
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedMovie)
      return res.status(404).json({ error: "Movie not found" });

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Movie
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie)
      return res.status(404).json({ error: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
