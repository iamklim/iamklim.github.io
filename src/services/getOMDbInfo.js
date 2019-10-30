import ajaxRequest from './ajaxRequest';
import { omdbApiKey } from '../apiKeys';

const getOMDbInfo = async (movies, updateMovies, setFinish) => {
    const promises = await movies.map(async (currMovie) => {

        const requestBody = 'https://www.omdbapi.com';
        const requestId = `i=${currMovie.imdb_id}`;
        const requestKey = `apikey=${omdbApiKey}`;
        const requestOMDb = `${requestBody}/?${requestId}&${requestKey}`;

        const movieInfo = await ajaxRequest(requestOMDb);

        currMovie.imdbRating = !isNaN(movieInfo.imdbRating) ? movieInfo.imdbRating : '-';
        currMovie.metascore = !isNaN(movieInfo.Metascore) ? movieInfo.Metascore : null;
        currMovie.year = !isNaN(movieInfo.Year) ? movieInfo.Year : null;
        currMovie.director = movieInfo.Director !== 'N/A' ? movieInfo.Director : null;
        currMovie.actors = movieInfo.Actors !== 'N/A' ? movieInfo.Actors : null;
        
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

export default getOMDbInfo;