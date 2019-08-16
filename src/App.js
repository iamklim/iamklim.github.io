import React, {Component} from 'react';
import { ajaxRequest } from './ajaxRequest';

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

        async function getNowPlaying() {
            const requestTMDb = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${TMDbAPI}`;
            const posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2

            await Promise.all([ajaxRequest(requestTMDb), ajaxRequest(`${requestTMDb}&page=2`)])
                .then(([nowPlayingPage1, nowPlayingPage2]) => {
                    let nowPlayingPage1Results = nowPlayingPage1.results;
                    let nowPlayingPage2Results = nowPlayingPage2.results.splice(-1,1); // to avoid maximum limit of 40 requests in API
                    let nowPlayingResults = nowPlayingPage1Results.concat(nowPlayingPage2Results);

                    nowPlayingResults.forEach((item) => {
                        if (item.poster_path === null) {
                            item.poster = null;
                        }
                        else {
                            item.poster = posterPath + item.poster_path;
                        }

                        movieItemsTMDb.push(item);
                    });
                });
        }

        async function getTMDbInfo() {
            for (let i = 0; i < movieItemsTMDb.length; i++) {
                let currTMDbId = movieItemsTMDb[i].id;
                let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;

                const movieInfo = await ajaxRequest(requestTMDb);

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
                let requestOMDb = `https://www.omdbapi.com/?i=${currIMDbId}&apikey=${OMDbAPI}`;

                const movieInfo = await ajaxRequest(requestOMDb);

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
                    on: {
                        init: function() {
                            let currSlideIndex = this.activeIndex;
                            let currSlide = this.slides[currSlideIndex];
                            let currItemDesc = currSlide.getElementsByClassName('item__description');

                            Array.from(currItemDesc).forEach((item) => {
                                console.log(item);
                                item.style.opacity = 1;
                            });

                            resolve(
                                that.setState({contentLoading: false})
                            )
                        },
                        slideChange: function() {
                            let allItemDesc = document.getElementsByClassName('item__description');

                            Array.from(allItemDesc).forEach((item) => {
                                item.style.opacity = 0;
                            });

                            let currSlideIndex = this.activeIndex;
                            let currSlide = this.slides[currSlideIndex];
                            let currItemDesc = currSlide.getElementsByClassName('item__description');

                            Array.from(currItemDesc).forEach((item) => {
                                console.log(item);
                                item.style.opacity = 1;
                            });

                        }
                    }
                });

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
                >
                    <Preloader/>
                </CSSTransition>

                <CSSTransition
                    in={!this.state.contentLoading}
                    timeout={1000}
                    classNames="animation"
                >
                    <div className="content">
                        <Slider movies={this.state.movies} />
                    </div>
                </CSSTransition>
            </>
        );
    }
}

export default App;
