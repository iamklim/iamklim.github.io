const sortByRating = (movies, setMovies, setMoviesAreSorted) => {
  try {
    const moviesUpdated = [...movies];
    moviesUpdated.sort((a, b) => (a.imdbRating > b.imdbRating ? -1 : 1));
    setMovies(moviesUpdated);
    setMoviesAreSorted(true);
  } catch (err) {
    console.log(err);
    setMoviesAreSorted(false);
  }
};

export default sortByRating;
