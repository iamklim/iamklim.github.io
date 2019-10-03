import ajaxRequest from './ajaxRequest';

const getNowPlaying = (apiKey, updateMovies, setFinish) => {
    const requestTMDb = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${apiKey}`;
    const posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2
    
    Promise.all([ajaxRequest(requestTMDb), ajaxRequest(`${requestTMDb}&page=2`)])
        .then(([nowPlayingPage1, nowPlayingPage2]) => {
            let nowPlayingPage1Results = nowPlayingPage1.results;
            let nowPlayingPage2Results = nowPlayingPage2.results;
            let nowPlayingResults = nowPlayingPage1Results.concat(nowPlayingPage2Results);
            let apiRequestsLimit = 39; // to avoid TMDb API 40 requests limit

            if (nowPlayingResults.length > apiRequestsLimit) {
                nowPlayingResults.length = apiRequestsLimit;
            }

            nowPlayingResults.forEach((item) => {
                if (item.poster_path === null) {
                    item.poster = null;
                }
                else {
                    item.poster = posterPath + item.poster_path;
                }
            });

            return nowPlayingResults;
        })
        .then((nowPlayingResults) => {
            updateMovies(nowPlayingResults);
        })
        .then(() => {
            setFinish(true);
        });
}

export default getNowPlaying;