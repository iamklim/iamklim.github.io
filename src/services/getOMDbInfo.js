import apiRequest from "./apiRequest";
import { OMDB_API_URL, OMDB_API_KEY } from "../config";

const getOMDbInfo = async (movies, setMovies, setOMDbInfoReceived, onError) => {
  try {
    const moviesUpdated = [...movies];
    const requestKey = `apikey=${OMDB_API_KEY}`;

    const moviesUpdatedWithInfo = await Promise.all(
      moviesUpdated.map(async (movie) => {
        movie.imdbRating = "-";

        const requestOMDb = `${OMDB_API_URL}/?i=${movie.imdb_id}&${requestKey}`;

        const omdbInfo = await apiRequest(requestOMDb);

        if (omdbInfo.Response === "True") {
          const { imdbRating, Metascore, Year, Director, Actors } = omdbInfo;

          movie.imdbRating = !isNaN(imdbRating) ? imdbRating : "-";
          movie.metascore = !isNaN(Metascore) ? Metascore : null;
          movie.year = !isNaN(Year) ? Year : null;
          movie.director = Director !== "N/A" ? Director : null;
          movie.actors = Actors !== "N/A" ? Actors : null;
        }

        return movie;
      })
    );

    if (moviesUpdatedWithInfo) {
      setMovies(moviesUpdatedWithInfo);
      setOMDbInfoReceived(true);
    } else {
      setOMDbInfoReceived(false);
      onError();
    }
  } catch (err) {
    console.log(err);
    setOMDbInfoReceived(false);
    onError();
  }
};

export default getOMDbInfo;
