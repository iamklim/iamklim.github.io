import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.sass";

import getNowPlaying from "./services/getNowPlaying";
import getTMDbInfo from "./services/getTMDbInfo";
import getOMDbInfo from "./services/getOMDbInfo";
import sortByRating from "./services/sortByRating";

import Preloader from "./Preloader/Preloader";
import Slider from "./Slider/Slider";
import ErrorFallback from "./ErrorFallback/ErrorFallback";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nowPlayingReceived, setNowPlayingReceived] = useState(false);
  const [TMDbInfoReceived, setTMDbInfoReceived] = useState(false);
  const [OMDbInfoReceived, setOMDbInfoReceived] = useState(false);
  const [moviesAreSorted, setMoviesAreSorted] = useState(false);
  const [sliderInited, setSliderInited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const onError = () => {
    setIsLoading(false);
    setError(true);
  };

  useEffect(() => {
    getNowPlaying(setMovies, setNowPlayingReceived, onError);
  }, []);

  useEffect(() => {
    if (nowPlayingReceived) {
      getTMDbInfo(movies, setMovies, setTMDbInfoReceived, onError);
    }
  }, [nowPlayingReceived]);

  useEffect(() => {
    if (TMDbInfoReceived) {
      getOMDbInfo(movies, setMovies, setOMDbInfoReceived, onError);
    }
  }, [TMDbInfoReceived]);

  useEffect(() => {
    if (OMDbInfoReceived) {
      sortByRating(movies, setMovies, setMoviesAreSorted, onError);
    }
  }, [OMDbInfoReceived]);

  useEffect(() => {
    if (sliderInited) {
      setIsLoading(false);
    }
  }, [sliderInited]);

  return (
    <>
      <div
        className={`content ${!isLoading && !error ? "content--visible" : ""}`}
      >
        <div className="content__credentials">
          <p>Made by Vladyslav Klymenko</p>
          <a href="https://www.linkedin.com/in/vladklymenko/">linkedIn</a>
          &nbsp;
          <a href="mailto:drkleem@gmail.com">drkleem@gmail.com</a>
        </div>

        <Slider
          movies={movies}
          moviesAreSorted={moviesAreSorted}
          onInit={setSliderInited}
        />
      </div>

      <CSSTransition
        in={isLoading && !error}
        timeout={500}
        classNames="animation"
        unmountOnExit
      >
        <Preloader />
      </CSSTransition>

      <CSSTransition
        in={!isLoading && error}
        timeout={500}
        classNames="animation"
        mountOnEnter
        unmountOnExit
      >
        <ErrorFallback />
      </CSSTransition>
    </>
  );
};

export default App;
