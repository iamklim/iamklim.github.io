import ajaxRequest from './ajaxRequest';
import { tmdbApiKey } from '../apiKeys';

const getNowPlaying = (region, userLanguage, updateMovies, setNowPlayingReceived, setAnswerReceived) => {

    const apiRequestsLimit = 39; // to avoid TMDb API 40 requests limit

    const requestBody = 'https://api.themoviedb.org/3/movie/now_playing';
    const requestRegion = `region=${region}`;
    const requestLanguage = `language=${userLanguage}`;
    const requestKey = `api_key=${tmdbApiKey}`;
    const requestTMDb = `${requestBody}?${requestRegion}&${requestLanguage}&${requestKey}`;

    const posterPath = 'https://image.tmdb.org/t/p/original'; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2
    
    Promise.all([ajaxRequest(requestTMDb), ajaxRequest(`${requestTMDb}&page=2`)])
        .then(([nowPlayingPage1, nowPlayingPage2]) => {
            let nowPlayingPage1Results = nowPlayingPage1.results;
            let nowPlayingPage2Results = nowPlayingPage2.results;
            let nowPlayingResults = nowPlayingPage1Results.concat(nowPlayingPage2Results);
            
            if (nowPlayingResults.length > apiRequestsLimit) {
                nowPlayingResults.length = apiRequestsLimit;
            }

            nowPlayingResults.forEach((item) => {
                if (item.poster_path) {
                    item.poster = posterPath + item.poster_path;
                }
            });

            return nowPlayingResults;
        })
        .then((nowPlayingResults) => {
            if (nowPlayingResults.length) {
                updateMovies(nowPlayingResults);
                setNowPlayingReceived(true);
            }
            else {
                setNowPlayingReceived(false);
                setAnswerReceived(true);
            }
        })
        .catch(() => {
            setNowPlayingReceived(false);
            setAnswerReceived(true);
        });
}

export default getNowPlaying;