import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Swiper from 'swiper';

import getNowPlaying from './services/getNowPlaying';
import getTMDbInfo from './services/getTMDbInfo';
import getOMDbInfo from './services/getOMDbInfo';
import sortByRating from './services/sortByRating';

import Preloader from "./Preloader/Preloader";
import Slider from './Slider/Slider';
import ErrorFallback from './ErrorFallback/ErrorFallback';
import CountrySelect from './CountrySelect/CountrySelect';
import LanguageSelect from './LanguageSelect/LanguageSelect';

import './App.sass';

const App = () => {
    const [ movies, setMovies ] = useState([]);
    const [ nowPlayingReceived, setNowPlayingReceived ] = useState(false);
    const [ TMDbInfoReceived, setTMDbInfoReceived ] = useState(false);
    const [ OMDbInfoReceived, setOMDbInfoReceived ] = useState(false);
    const [ moviesAreSorted, setMoviesAreSorted ] = useState(false);
    const [ sliderInited, setSliderInited ] = useState(false);
    const [ answerReceived, setAnswerReceived ] = useState(false);
    const [ contentIsLoaded, setContentIsLoaded ] = useState(false);
    const [ region, setRegion ] = useState('UA');
    const [ language, setLanguage ] = useState('ru');

    const didMount = useRef(false);

    useEffect(() => {
        getNowPlaying(region, language, setMovies, setNowPlayingReceived, setAnswerReceived);
    }, []);

    useEffect(() => {
        if (didMount.current) {
            setAnswerReceived(false);
            setContentIsLoaded(false);
            setMovies([]);
            setNowPlayingReceived(false);
            setTMDbInfoReceived(false);
            setOMDbInfoReceived(false);
            setMoviesAreSorted(false);
            setSliderInited(false);
            
            getNowPlaying(region, language, setMovies, setNowPlayingReceived, setAnswerReceived);
        }
        else {
            didMount.current = true;
        }
    }, [region, language]);

    useEffect(()=>{
        if (nowPlayingReceived && movies.length) {
            getTMDbInfo(movies, language, setMovies, setTMDbInfoReceived);
        }
    }, [nowPlayingReceived]);

    useEffect(()=>{
        if (TMDbInfoReceived && movies.length) {
            getOMDbInfo(movies, setMovies, setOMDbInfoReceived);
        }
    }, [TMDbInfoReceived]);

    useEffect(()=>{
        if (OMDbInfoReceived && movies.length) {
            const sortedMovies = sortByRating(movies);
            setMovies(sortedMovies);
            setMoviesAreSorted(true);
        }
    }, [OMDbInfoReceived]);

    useEffect(()=>{
        if (sliderInited && movies.length) {
            setContentIsLoaded(true);
            setAnswerReceived(true);
        }
    }, [sliderInited]);

    //eslint-disable-next-line
    // useEffect(()=>{
    //     console.log('-------------------------------------');
    //     console.log('nowPlayingReceived',nowPlayingReceived);
    //     console.log('TMDbInfoReceived',TMDbInfoReceived);
    //     console.log('OMDbInfoReceived',OMDbInfoReceived);
    //     console.log('moviesAreSorted',moviesAreSorted);
    //     console.log('contentIsLoaded',contentIsLoaded);
    //     console.log('answerReceived',answerReceived);
    //     console.log('sliderInited',sliderInited);
    //     console.log('didMount.current',didMount.current);
    //     console.log(movies);
    // })

    return (
        <>
            <div className={`content ${contentIsLoaded && answerReceived ? 'content--visible' : ''}`}>

                <CountrySelect onSelect={setRegion} />
                <LanguageSelect onSelect={setLanguage} />

                <div className="credentials">
                    <p>Made by Vladyslav Klymenko</p>
                    <a href="https://www.linkedin.com/in/vladklymenko/">linkedIn</a>
                    &nbsp;
                    <a href="mailto:drkleem@gmail.com">drkleem@gmail.com</a>
                </div>
                <Slider movies={movies} moviesAreSorted={moviesAreSorted} onInit={setSliderInited} />
            </div>

            <CSSTransition
                in={!contentIsLoaded && !answerReceived}
                timeout={500}
                classNames="animation"
                unmountOnExit
            >
                <Preloader />
            </CSSTransition>

            <CSSTransition
                in={!contentIsLoaded && answerReceived}
                timeout={500}
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