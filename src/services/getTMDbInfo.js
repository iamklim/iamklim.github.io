import ajaxRequest from './ajaxRequest';

const getTMDbInfo = async (apiKey, movies, browserLanguage, updateMovies, setFinish) => {
    console.log('getTMDbInfo 2-2');
    const promises = await movies.map(async (currMovie) => {
        let currTMDbId = currMovie.id;

        let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${apiKey}&language=${browserLanguage}&append_to_response=external_ids,videos`;

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