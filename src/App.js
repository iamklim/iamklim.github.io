import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Swiper from 'swiper';

import getNowPlaying from './services/getNowPlaying';
import getTMDbInfo from './services/getTMDbInfo';
import getOMDbInfo from './services/getOMDbInfo';

import Slider from './Slider/Slider';
import Preloader from "./Preloader/Preloader";
import ErrorFallback from './ErrorFallback/ErrorFallback';

import './App.sass';

function App() {
    const [ movies, setMovies ] = useState([]);
    const [ nowPlayingReceived, setNowPlayingReceived ] = useState(false);
    const [ TMDbInfoReceived, setTMDbInfoReceived ] = useState(false);
    const [ OMDbInfoReceived, setOMDbInfoReceived ] = useState(false);
    const [ moviesAreSorted, setMoviesAreSorted ] = useState(false);
    const [ sliderInited, setSliderInited ] = useState(false);
    const [ answerReceived, setAnswerReceived ] = useState(false);
    const [ contentIsLoaded, setContentIsLoaded ] = useState(false);
  
    const TMDbAPI = "3b07521ea25bf66106a9525b3054c8e9";
    const OMDbAPI = "55018c43";

    const sortByRating = () => {
        const sortedMovies = [].concat(movies).sort(function (a, b) {
            return a.imdbRating > b.imdbRating ? -1 : 1;
        });

        setMovies(sortedMovies);
        setMoviesAreSorted(true);
    }

    const initSlider = () => {
        new Swiper('.swiper-container', {
            effect: 'coverflow',
            centeredSlides: true,
            slidesPerView: 'auto',
            mousewheel: true,
            keyboard: true,
            slideToClickedSlide: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
              },
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : false, // Done using CSS
            },
            on: {
                init: function() {
                    setSliderInited(true);
                }
            }
        });
    }

    useEffect(() => {
        getNowPlaying(TMDbAPI, setMovies, setNowPlayingReceived, setAnswerReceived);
    }, []);

    useEffect(()=>{
        if (nowPlayingReceived && movies.length) {
            getTMDbInfo(TMDbAPI, movies, setMovies, setTMDbInfoReceived);
        }
    }, [nowPlayingReceived]);

    useEffect(()=>{
        if (TMDbInfoReceived && movies.length) {
            getOMDbInfo(OMDbAPI, movies, setMovies, setOMDbInfoReceived);
        }
    }, [TMDbInfoReceived]);

    useEffect(()=>{
        if (OMDbInfoReceived && movies.length) {
            sortByRating();
        }
    }, [OMDbInfoReceived]);

    useEffect(()=>{
        if (moviesAreSorted && movies.length) {
            initSlider();
        }
    }, [moviesAreSorted]);

    useEffect(()=>{
        if (sliderInited && movies.length) {
            setContentIsLoaded(true);
            setAnswerReceived(true);
        }
    }, [sliderInited]);

    // eslint-disable-next-line
    // useEffect(()=>{
    //     console.log('-----------------------------------------------------------------');
    //     console.log('nowPlayingReceived',nowPlayingReceived);
    //     console.log('TMDbInfoReceived',TMDbInfoReceived);
    //     console.log('moviesAreSorted',moviesAreSorted);
    //     console.log('contentIsLoaded',contentIsLoaded);
    //     console.log('answerReceived',answerReceived);
    //     console.log(movies);
    // })

    return (
        <>
            <div className={`content ${contentIsLoaded && answerReceived ? 'content--visible' : ''}`}>
                <div className="credentials">
                    <p>Made by Vladyslav Klymenko</p>
                    <a href="https://www.linkedin.com/in/vladklymenko/">LinkedIn</a>
                    &nbsp;
                    <a href="mailto:drkleem@gmail.com">drkleem@gmail.com</a>
                </div>
                <Slider movies={movies} moviesAreSorted={moviesAreSorted} />
            </div>

            <CSSTransition
                in={!contentIsLoaded && !answerReceived}
                timeout={500}
                classNames="animation"
                unmountOnExit
            >
                <Preloader/>
            </CSSTransition>

            <CSSTransition
                in={!contentIsLoaded && answerReceived}
                timeout={1000}
                classNames="animation"
                mountOnEnter
                unmountOnExit
            >
                <ErrorFallback />
            </CSSTransition>
        </>
    );
    
}

export default App;
