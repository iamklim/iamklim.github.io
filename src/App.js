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

        const receiveMovieItems = async () => {
            const TMDbNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=${TMDbAPI}`;
            const posterPath = `https://image.tmdb.org/t/p/original`; // lower resolution: https://image.tmdb.org/t/p/w370_and_h556_bestv2

            const response = await fetch(TMDbNowPlaying, {method: 'get'});
            const jsonData = await response.json();
            const responseResults = jsonData.results;

            responseResults.forEach((item) => {
                item.poster = posterPath + item.poster_path;
            });

            return responseResults;
        }

        const updateMovieInfo = async (index) => {
            let currMovie = that.state.movies[index];
            let currTMDbId = currMovie.id;
            let currTMDbMovieInfo = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;

            const response = await fetch(currTMDbMovieInfo, {method: 'get'});
            const jsonData = await response.json();

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

            currMovie.imdb_id = currIMDbId;
            currMovie.trailer_url = lastTrailerUrl;
            currMovie.genres = currGenres;

            return currMovie;
        }

        const updateMovies = () => {
            let newState = [];
            for (let i = 0; i < that.state.length; i++) {
                //await updateMovieInfo(i);
                console.log(1111111111111);
            }
            // return newState;
            console.log(that.state.movies)
        }

        const updateState = (newData) => {
            that.setState({movies: newData})
        }

        receiveMovieItems()
            .then(responseResults => updateState(responseResults))
            .then(() => updateMovies() )


        // const updateMovieInfo = (index) => {
        //
        //     let currMovie = that.state.movies[index];
        //     let currTMDbId = currMovie.id;
        //     let currTMDbMovieInfo = `https://api.themoviedb.org/3/movie/${currTMDbId}?api_key=${TMDbAPI}&append_to_response=external_ids,videos&language=ru-RU`;
        //
        //     fetch(currTMDbMovieInfo, {
        //         method: 'get',
        //     }).then(function (response) {
        //         return response.json();
        //     }).then(function (jsonData) {
        //         let currIMDbId = jsonData.imdb_id;
        //
        //         let trailers = jsonData.videos.results,
        //             lastTrailerUrl = '';
        //         if (trailers.length > 0) {
        //             let lastTrailer = trailers[trailers.length - 1];
        //             if (lastTrailer.site === "YouTube") {
        //                 lastTrailerUrl = `https://www.youtube.com/watch?v=${lastTrailer.key}`;
        //             }
        //         }
        //
        //         let currGenres = jsonData.genres;
        //
        //         currMovie.imdb_id = currIMDbId;
        //         currMovie.trailer_url = lastTrailerUrl;
        //         currMovie.genres = currGenres;
        //
        //         let currOMDbMovieInfo = `http://www.omdbapi.com/?i=${currIMDbId}&apikey=${OMDbAPI}`;
        //         return fetch(currOMDbMovieInfo, {
        //             method: 'get',
        //         })
        //     }).then(function (response) {
        //         return response.json();
        //     }).then(function(jsonData) {
        //         if (isNaN(jsonData.imdbRating)) {
        //             jsonData.imdbRating = '-';
        //         }
        //
        //         currMovie.imdbRating = jsonData.imdbRating; // may be "-"
        //         currMovie.director = jsonData.Director;
        //         currMovie.actors = jsonData.Actors;
        //         currMovie.metascore = jsonData.Metascore; // may be "N/A"
        //
        //         return currMovie;
        //     }).catch(function(error) {
        //         console.log('Request failed', error)
        //     });
        //
        // }
        //
        // const updateMovies = () => {
        //     for (let i = 0; i < that.state.movies.length; i++) {
        //         updateMovieInfo(i)
        //     }
        // }
        //
        // const sortArray = () => {
        //     let newState = [...that.state.movies];
        //
        //     newState.sort(function (a, b) {
        //         if (a.imdbRating > b.imdbRating) {
        //             return -1;
        //         }
        //         else if (a.imdbRating < b.imdbRating) {
        //             return 1;
        //         }
        //         else {
        //             return 0;
        //         }
        //     });
        //
        //     return newState;
        // }
        //
        // const updateState = (newState) => {
        //     that.setState({ movies: newState, contentLoaded: true });
        // }

    }

    render() {
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
