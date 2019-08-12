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
    }

    componentDidMount() {

        const TMDbAPI = "3b07521ea25bf66106a9525b3054c8e9";
        const OMDbAPI = "55018c43";
        const that = this;

        let TMDbNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${TMDbAPI}`;
        let posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2

        fetch(TMDbNowPlaying, {
            method: 'get',
        }).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            const responseResults = jsonData.results;
            responseResults.forEach((item) => {
                item.poster = posterPath + item.poster_path;
            });
            that.setState({movies: responseResults});

            let newState = [...that.state.movies];

            for (let i = 0; i < that.state.movies.length; i++) {
                let currTMDbId = that.state.movies[i].id;
                let currTMDbMovieInfo = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;

                fetch(currTMDbMovieInfo, {
                    method: 'get',
                }).then(function (response) {
                    return response.json();
                }).then(function (jsonData) {
                    let currIMDbId = jsonData.imdb_id;

                    let trailers = jsonData.videos.results,
                        lastTrailerUrl = '';
                    if (trailers.length > 0) {
                        let lastTrailer = trailers[trailers.length - 1];
                        if (lastTrailer.site === "YouTube") {
                            lastTrailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
                        }
                    }

                    let currGenres = jsonData.genres;

                    newState[i].imdb_id = currIMDbId;
                    newState[i].trailer_url = lastTrailerUrl;
                    newState[i].genres = currGenres;

                    let currOMDbMovieInfo = `http://www.omdbapi.com/?i=${currIMDbId}&apikey=${OMDbAPI}`;
                    return fetch(currOMDbMovieInfo, {
                        method: 'get',
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function(jsonData) {
                    if (isNaN(jsonData.imdbRating)) {
                        jsonData.imdbRating = '-';
                    }

                    newState[i].imdbRating = jsonData.imdbRating; // may be "-"
                    newState[i].director = jsonData.Director;
                    newState[i].actors = jsonData.Actors;
                    newState[i].metascore = jsonData.Metascore; // may be "N/A"
                })

                .catch(function(error) {
                    console.log('Request failed', error)
                });
            }

            newState.sort(function (a, b) {
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

            that.setState({ movies: newState, contentLoaded: true });

        }).catch(function(error) {
            console.log('Request failed', error)
        })

    }

    render() {
        console.log(this.state.movies)
        return (
            <>
                {/*<Preloader contentLoaded={this.state.contentLoaded}/>*/}
                {/*<div className="content">*/}
                    {/*<Slider movies={this.state.movies} />*/}
                {/*</div>*/}
            </>
        );
    }
}

export default App;
