import apiRequest from "./apiRequest";
import { TMDB_API_URL, TMDB_API_KEY, TMDB_LANGUAGE } from "../config";

const getTMDbInfo = async (movies, setMovies, setTMDbInfoReceived, onError) => {
  try {
    const moviesUpdated = [...movies];

    const requestBody = `${TMDB_API_URL}/3/movie`;
    const requestKey = `api_key=${TMDB_API_KEY}`;
    const requestLanguage = `language=${TMDB_LANGUAGE}`;
    const requestAppend = "append_to_response=external_ids,videos";

    const moviesUpdatedWithInfo = await Promise.all(
      moviesUpdated.map(async (movie) => {
        const requestTMDb = `${requestBody}/${movie.id}?${requestKey}&${requestLanguage}&${requestAppend}`;
        const tmdbInfo = await apiRequest(requestTMDb);

        const trailers = tmdbInfo.videos.results;

        if (trailers.length > 0) {
          const lastTrailer = trailers[trailers.length - 1];
          if (lastTrailer.site === "YouTube") {
            //trailerUrl = `https://www.youtube.com/embed/${lastTrailer.key}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
            movie.trailerId = lastTrailer.key;
          }
        }

        movie.imdb_id = tmdbInfo.imdb_id;
        movie.genres = tmdbInfo.genres.length ? tmdbInfo.genres : null;

        return movie;
      })
    );

    if (moviesUpdatedWithInfo) {
      setMovies(moviesUpdatedWithInfo);
      setTMDbInfoReceived(true);
    } else {
      setTMDbInfoReceived(false);
      onError();
    }
  } catch (err) {
    console.log(err);
    setTMDbInfoReceived(false);
    onError();
  }
};

export default getTMDbInfo;
