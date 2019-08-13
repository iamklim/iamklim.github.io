import React, {Component} from 'react';
import './App.sass';

import Swiper from 'swiper';
import Slider from './Slider/Slider';
import Preloader from "./Preloader/Preloader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            contentLoaded: false
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

                xhr.onreadystatechange = function() {
                    if (this.readyState === this.DONE) {
                        const responseParsed = JSON.parse(this.responseText);
                        resolve(
                           responseParsed
                        )
                    }
                };

                xhr.open("GET", url);
                xhr.send();
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

        async function getIMDbId() {

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

            console.log(movieItemsTMDb);
        }

        async function getIMDbRating() {

            function makeAjaxRequest(index) {
                return new Promise(function(resolve, reject) {
                    let currIMDbId = movieItemsTMDb[index].imdb_id;
                    let requestOMDb = `http://www.omdbapi.com/?i=${currIMDbId}&apikey=${OMDbAPI}`;

                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", requestOMDb);
                    xhr.send();

                    xhr.onreadystatechange = function() {
                        if (this.readyState === this.DONE) {
                            const responseParsed = JSON.parse(this.responseText);
                            console.log(responseParsed)
                            if (isNaN(responseParsed.imdbRating)) {
                                responseParsed.imdbRating = '-';
                            }

                            resolve (
                                movieItemsTMDb[index].imdbRating = responseParsed.imdbRating, // may be "N/A"
                                movieItemsTMDb[index].director = responseParsed.Director,
                                movieItemsTMDb[index].actors = responseParsed.Actors,
                                movieItemsTMDb[index].metascore = responseParsed.Metascore // may be "N/A"
                            );

                        }
                    };
                });
            }

            for (let i = 0; i < movieItemsTMDb.length; i++) {
                await makeAjaxRequest(i);
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
            function setNewState() {
                return new Promise(function(resolve, reject) {
                    JSON.stringify(movieItemsTMDb);
                    resolve(that.setState({movies: movieItemsTMDb}))
                });
            }
            await setNewState();
            console.log(that.state);
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
                    that.setState({contentLoaded: true})
                )
            });
        }

        (async function(){
            await getNowPlaying();
            await getIMDbId();
            // await getIMDbRating();
            // await sortByRating();
            // await updateState();
            // await initSlider();
        })();

    }

    render() {
        return (
            <>
                <Preloader contentLoaded={this.state.contentLoaded}/>
                <div className="content">
                    <Slider movies={this.state.movies} />
                </div>
            </>
        );
    }
}

export default App;
