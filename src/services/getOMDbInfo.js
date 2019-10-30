import ajaxRequest from './ajaxRequest';

const getOMDbInfo = async (apiKey, movies, updateMovies, setFinish) => {
    console.log('getOMDbInfo 3');
    const promises = await movies.map(async (currMovie) => {
        let currIMDbId = currMovie.imdb_id;
        let requestOMDb = `https://www.omdbapi.com/?i=${currIMDbId}&apikey=${apiKey}`;

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