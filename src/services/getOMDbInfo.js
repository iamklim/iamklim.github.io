import ajaxRequest from './ajaxRequest';

const getOMDbInfo = async (apiKey, movies, updateMovies, setFinish) => {

    const promises = await movies.map(async (currMovie) => {
        let currIMDbId = currMovie.imdb_id;
        let requestOMDb = `https://www.omdbapi.com/?i=${currIMDbId}&apikey=${apiKey}`;

        const movieInfo = await ajaxRequest(requestOMDb);

        if (isNaN(movieInfo.imdbRating)) { // may be "N/A"
            movieInfo.imdbRating = '-';
        }

        currMovie.imdbRating = movieInfo.imdbRating;
        currMovie.director = movieInfo.Director;
        currMovie.actors = movieInfo.Actors;
        currMovie.metascore = movieInfo.Metascore; // may be "N/A"
        currMovie.year = movieInfo.Year;

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