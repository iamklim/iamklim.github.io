import ajaxRequest from './ajaxRequest';

const getTMDbInfo = async (apiKey, movies, updateMovies, setFinish) => {

    const promises = await movies.map(async (currMovie) => {
        let currTMDbId = currMovie.id;
        let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${apiKey}&append_to_response=external_ids,videos&language=ru-RU`;

        const movieInfo = await ajaxRequest(requestTMDb);

        let trailers = movieInfo.videos.results,
            trailerUrl = '';
        if (trailers.length > 0) {
            let lastTrailer = trailers[trailers.length - 1];
            if (lastTrailer.site === "YouTube") {
                trailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
            }
        }

        currMovie.imdb_id = movieInfo.imdb_id;
        currMovie.trailer_url = trailerUrl;
        currMovie.genres = movieInfo.genres;

        return currMovie;
    })

    await Promise.all(promises)
    .then((updatedMovies) => {
        updateMovies(updatedMovies)
    })
    .then(() => {
        setFinish(true)
    });

    // for (let i = 0; i < movies.length; i++) {
    //     let currTMDbId = movies[i].id;
    //     let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${apiKey}&append_to_response=external_ids,videos&language=ru-RU`;

    //     const movieInfo = await ajaxRequest(requestTMDb);

    //     let trailers = movieInfo.videos.results,
    //         trailerUrl = '';
    //     if (trailers.length > 0) {
    //         let lastTrailer = trailers[trailers.length - 1];
    //         if (lastTrailer.site === "YouTube") {
    //             trailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
    //         }
    //     }

    //     movies[i].imdb_id = movieInfo.imdb_id;
    //     movies[i].trailer_url = trailerUrl;
    //     movies[i].genres = movieInfo.genres;
    // }

}

export default getTMDbInfo;