import ajaxRequest from './ajaxRequest';
import { omdbApiKey } from '../apiKeys';

const getOMDbInfo = (movies, updateMovies, setFinish) => {

    // Promise.allSettled polyfill
    if (!Promise.allSettled) {
        Promise.allSettled = function(promises) {
            return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
                state: 'fulfilled',
                value: value
            }), error => ({
                state: 'rejected',
                reason: error
            }))));
        };
    }

    Promise.allSettled(movies.map(currMovie => {
        const requestBody = 'https://www.omdbapi.com';
        const requestId = `i=${currMovie.imdb_id}`;
        const requestKey = `apikey=${omdbApiKey}`;
        const requestOMDb = `${requestBody}/?${requestId}&${requestKey}`;

        return ajaxRequest(requestOMDb);
    }))
    .then(results => {
        const moviesUpdated = movies;

        results.map((item, index) => {
            const referredMovie = moviesUpdated[index];
            referredMovie.imdbRating = '-';

            if (item.status === "fulfilled" && typeof item.value !== 'undefined') {
                const { value } = item;
                if (value.Response === "True") {
                    const { imdbRating, Metascore, Year, Director, Actors} = value;
                
                    if (!isNaN(imdbRating)) referredMovie.imdbRating = imdbRating;
                    referredMovie.metascore = !isNaN(Metascore) ? Metascore : null;
                    referredMovie.year = !isNaN(Year) ? Year : null;
                    referredMovie.director = Director !== 'N/A' ? Director : null;
                    referredMovie.actors = Actors !== 'N/A' ? Actors : null;
                }
            }
            return referredMovie;
        });

        return moviesUpdated;
    })
    .then(moviesUpdated => {
        updateMovies(moviesUpdated);
        setFinish(true);
    });
    
    // const promises = await movies.map(async (currMovie) => {

    //     const requestBody = 'https://www.omdbapi.com';
    //     const requestId = `i=${currMovie.imdb_id}`;
    //     const requestKey = `apikey=${omdbApiKey}`;
    //     const requestOMDb = `${requestBody}/?${requestId}&${requestKey}`;

    //     const movieInfo = await ajaxRequest(requestOMDb);

    //     currMovie.imdbRating = !isNaN(movieInfo.imdbRating) ? movieInfo.imdbRating : '-';
    //     currMovie.metascore = !isNaN(movieInfo.Metascore) ? movieInfo.Metascore : null;
    //     currMovie.year = !isNaN(movieInfo.Year) ? movieInfo.Year : null;
    //     currMovie.director = movieInfo.Director !== 'N/A' ? movieInfo.Director : null;
    //     currMovie.actors = movieInfo.Actors !== 'N/A' ? movieInfo.Actors : null;
        
    //     return currMovie;
    // })

    // await Promise.all(promises)
    // .then((updatedMovies) => {
    //     updateMovies(updatedMovies)
    // })
    // .then(() => {
    //     setFinish(true)
    // });

    // const promises = await movies.map(async (currMovie) => {

    //     const requestBody = 'https://www.omdbapi.com';
    //     const requestId = `i=${currMovie.imdb_id}`;
    //     const requestKey = `apikey=${omdbApiKey}`;
    //     const requestOMDb = `${requestBody}/?${requestId}&${requestKey}`;

    //     const movieInfo = await ajaxRequest(requestOMDb);

    //     currMovie.imdbRating = !isNaN(movieInfo.imdbRating) ? movieInfo.imdbRating : '-';
    //     currMovie.metascore = !isNaN(movieInfo.Metascore) ? movieInfo.Metascore : null;
    //     currMovie.year = !isNaN(movieInfo.Year) ? movieInfo.Year : null;
    //     currMovie.director = movieInfo.Director !== 'N/A' ? movieInfo.Director : null;
    //     currMovie.actors = movieInfo.Actors !== 'N/A' ? movieInfo.Actors : null;
        
    //     return currMovie;
    // })

    // await Promise.all(promises)
    // .then((updatedMovies) => {
    //     updateMovies(updatedMovies)
    // })
    // .then(() => {
    //     setFinish(true)
    // });
    
}

export default getOMDbInfo;