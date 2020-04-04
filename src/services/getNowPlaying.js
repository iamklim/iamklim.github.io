import apiRequest from "./apiRequest";
import {
  TMDB_API_URL,
  TMDB_API_KEY,
  TMDB_REGION,
  TMDB_LANGUAGE,
  TMDB_IMAGES_URL,
} from "../config";

const getNowPlaying = async (
  setMovies,
  setNowPlayingReceived,
  setAnswerReceived
) => {
  try {
    const requestBody = `${TMDB_API_URL}/3/movie/now_playing`;
    const requestRegion = `region=${TMDB_REGION}`;
    const requestLanguage = `language=${TMDB_LANGUAGE}`;
    const requestKey = `api_key=${TMDB_API_KEY}`;
    const requestTMDb = `${requestBody}?${requestRegion}&${requestLanguage}&${requestKey}`;

    const posterPath = `${TMDB_IMAGES_URL}/t/p/original`;

    const [nowPlayingPage1, nowPlayingPage2] = await Promise.all([
      apiRequest(requestTMDb),
      apiRequest(`${requestTMDb}&page=2`),
    ]);
    const nowPlayingResults = [
      ...nowPlayingPage1.results,
      ...nowPlayingPage2.results,
    ];

    nowPlayingResults.forEach((movie) => {
      if (movie.poster_path) {
        movie.poster = `${posterPath}${movie.poster_path}`;
      }
    });

    if (nowPlayingResults) {
      setMovies(nowPlayingResults);
      setNowPlayingReceived(true);
    } else {
      setNowPlayingReceived(false);
      //setAnswerReceived(true);
    }
  } catch (err) {
    setNowPlayingReceived(false);
    //setAnswerReceived(true);
  }
};

export default getNowPlaying;
