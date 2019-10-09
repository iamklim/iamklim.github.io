import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import 'swiper/dist/css/swiper.css';
import './Slider.sass';

import SingleSlide from './SingleSlide/SingleSlide';
import VideoPopup from '../VideoPopup/VideoPopup';

function Slider({ movies, moviesAreSorted }) {
    const [showPopup, setShowPopup] = useState(false);
    const [currTrailerUrl, setCurrTrailerUrl] = useState('');

    return (
        <>
            <div className="swiper-container">
                <div className="swiper-scrollbar" />
                <div className="swiper-wrapper">
                    {moviesAreSorted &&
                        movies.map((item) => (
                            <SingleSlide 
                                key={item.id} 
                                movie={item} 
                                setShowPopup={setShowPopup} 
                                setCurrTrailerUrl={setCurrTrailerUrl} 
                            />
                        ))
                    }
                </div>
            </div>
            
            <CSSTransition
                in={showPopup && currTrailerUrl.length > 0}
                timeout={500}
                classNames="animation"
                mountOnEnter
                unmountOnExit
            >
                <VideoPopup 
                    currTrailerUrl={currTrailerUrl} 
                    setShowPopup={setShowPopup} 
                />
            </CSSTransition>
        </>
    );

}

export default Slider;
