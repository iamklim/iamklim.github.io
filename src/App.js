import React, {Component} from 'react';
import './App.sass';
import { CSSTransition } from 'react-transition-group';

import Swiper from 'swiper';
import Slider from './Slider/Slider';
import Preloader from "./Preloader/Preloader";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            contentLoading: true
        };
        this.getData();
    }

    getData() {
        let movieItemsTMDb = [];
        const TMDbAPI = "3b07521ea25bf66106a9525b3054c8e9";
        const OMDbAPI = "55018c43";
        const that = this;
        
        function makeAjaxRequest(url) {
            return new Promise(function(resolve, reject) {
                let xhr = new XMLHttpRequest();

                xhr.open("GET", url, true);
                xhr.send();

                xhr.onreadystatechange = function() {
                    if (this.readyState === this.DONE) {
                        const responseParsed = JSON.parse(this.responseText);
                        resolve(responseParsed);
                    }
                };
            });
        }

        async function getNowPlaying() {
            const requestTMDb = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${TMDbAPI}`;
            const posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2

            const nowPlaying = await makeAjaxRequest(requestTMDb);
            const nowPlayingResults = nowPlaying.results;

            nowPlayingResults.forEach((item) => {
                item.poster = posterPath + item.poster_path;
                movieItemsTMDb.push(item);
            });
        }

        async function getTMDbInfo() {
            for (let i = 0; i < movieItemsTMDb.length; i++) {
                let currTMDbId = movieItemsTMDb[i].id;
                let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;

                const movieInfo = await makeAjaxRequest(requestTMDb);

                let trailers = movieInfo.videos.results,
                    trailerUrl = '';
                if (trailers.length > 0) {
                    let lastTrailer = trailers[trailers.length - 1];
                    if (lastTrailer.site === "YouTube") {
                        trailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
                    }
                }

                movieItemsTMDb[i].imdb_id = movieInfo.imdb_id;
                movieItemsTMDb[i].trailer_url = trailerUrl;
                movieItemsTMDb[i].genres = movieInfo.genres;
            }

        }

        async function getOMDbInfo() {
            for (let i = 0; i < movieItemsTMDb.length; i++) {
                let currIMDbId = movieItemsTMDb[i].imdb_id;
                let requestOMDb = `http://www.omdbapi.com/?i=${currIMDbId}&apikey=${OMDbAPI}`;

                const movieInfo = await makeAjaxRequest(requestOMDb);

                if (isNaN(movieInfo.imdbRating)) { // may be "N/A"
                    movieInfo.imdbRating = '-';
                }

                movieItemsTMDb[i].imdbRating = movieInfo.imdbRating;
                movieItemsTMDb[i].director = movieInfo.Director;
                movieItemsTMDb[i].actors = movieInfo.Actors;
                movieItemsTMDb[i].metascore = movieInfo.Metascore; // may be "N/A"
            }
        }

        async function sortByRating() {
            movieItemsTMDb.sort(function (a, b) {
                if (a.imdbRating > b.imdbRating) {
                    return -1;
                }
                else if (a.imdbRating < b.imdbRating) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

        }

        async function updateState() {
            return new Promise(function(resolve, reject) {
                JSON.stringify(movieItemsTMDb);
                resolve(
                    that.setState({movies: movieItemsTMDb})
                )
            });
        }

        async function initSlider() {
            return new Promise(function(resolve, reject) {
                resolve(
                    new Swiper('.swiper-container', {
                        effect: 'coverflow',
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        mousewheel: true,
                        keyboard: true,
                        coverflowEffect: {
                            rotate: 20,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows : true,
                        },
                    }),
                    that.setState({contentLoading: false})
                )
            });
        }

        (async function(){
            await getNowPlaying();
            await getTMDbInfo();
            await getOMDbInfo();
            await sortByRating();
            await updateState();
            await initSlider();
        })();

    }

    render() {

        return (
            <>
                <CSSTransition
                    in={this.state.contentLoading}
                    timeout={500}
                    classNames="animation"
                    unmountOnExit
                    appear
                >
                    <Preloader/>
                </CSSTransition>

                <div className="content">
                    <Slider movies={this.state.movies} />
                </div>
            </>
        );
    }
}

export default App;
