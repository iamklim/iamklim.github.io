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

        async function getNowPlaying() {

             function makeAjaxRequest() {
                 return new Promise(function(resolve, reject) {
                    let requestTMDb = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${TMDbAPI}`;
                    let posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2
                    let xhr = new XMLHttpRequest();

                    xhr.open("GET", requestTMDb);
                    xhr.send();

                    xhr.onreadystatechange = function() {
                        if (this.readyState === this.DONE) {
                            const responseParsed = JSON.parse(this.responseText);
                            const responseResults = responseParsed.results;
                            //console.log(responseResults);
                            resolve(
                                responseResults.forEach((item) => {
                                    item.poster = posterPath + item.poster_path;
                                    movieItemsTMDb.push(item);
                                })
                            );
                        }
                    };
                 });
            }
            await makeAjaxRequest();
        }

        async function getIMDbId() {

            function makeAjaxRequest(index) {
                return new Promise(function(resolve, reject) {
                    let currTMDbId = movieItemsTMDb[index].id;
                    let requestTMDb = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;

                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", requestTMDb);
                    xhr.send();

                    xhr.onreadystatechange = function() {
                        if (this.readyState === this.DONE) {
                            const responseParsed = JSON.parse(this.responseText);
                            let trailers = responseParsed.videos.results,
                                trailerUrl = '';
                            if (trailers.length > 0) {
                                let lastTrailer = trailers[trailers.length - 1];
                                if (lastTrailer.site === "YouTube") {
                                    trailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
                                }
                            }
                            //console.log(responseParsed);
                            resolve(
                                movieItemsTMDb[index].imdb_id = responseParsed.imdb_id,
                                movieItemsTMDb[index].trailer_url = trailerUrl,
                                movieItemsTMDb[index].genres = responseParsed.genres
                            );
                        }
                    };
                });
            }

            for (let i = 0; i < movieItemsTMDb.length; i++) {
                await makeAjaxRequest(i);
            }
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
            await getIMDbRating();
            await sortByRating();
            await updateState();
            await initSlider();
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
