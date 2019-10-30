import ajaxRequest from './ajaxRequest';
import { tmdbApiKey } from '../apiKeys';

const getTMDbInfo = async (movies, browserLanguage, updateMovies, setFinish) => {
    const promises = await movies.map(async (currMovie) => {

        const requestBody = 'https://api.themoviedb.org/3/movie';
        const requestId = currMovie.id;
        const requestKey = `api_key=${tmdbApiKey}`;
        const requestLanguage = `language=${browserLanguage}`;
        const requestAppend = 'append_to_response=external_ids,videos';
        const requestTMDb = `${requestBody}/${requestId}?${requestKey}&${requestLanguage}&${requestAppend}`;

        const movieInfo = await ajaxRequest(requestTMDb);

        let trailers = movieInfo.videos.results;

        if (trailers.length > 0) {
            let lastTrailer = trailers[trailers.length - 1];
            if (lastTrailer.site === "YouTube") {
                //trailerUrl = `https://www.youtube.com/embed/${lastTrailer.key}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
                currMovie.trailerId = lastTrailer.key;
            }
        }

        currMovie.imdb_id = movieInfo.imdb_id;
        currMovie.genres = movieInfo.genres.length ? movieInfo.genres : null;

        return currMovie;
        
    })

    await Promise.all(promises)
    .then((updatedMovies) => {
        updateMovies(updatedMovies)
    })
    .then(() => {
        setFinish(true)
    });

}

export default getTMDbInfo;