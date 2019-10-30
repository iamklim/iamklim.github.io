import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import 'swiper/dist/css/swiper.css';
import './Slider.sass';

import SingleSlide from './SingleSlide/SingleSlide';
import VideoPopup from '../VideoPopup/VideoPopup';

function Slider({ movies, moviesAreSorted }) {
    const [showPopup, setShowPopup] = useState(false);
    const [currTrailerId, setCurrTrailerId] = useState('');

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
                                setCurrTrailerId={setCurrTrailerId} 
                            />
                        ))
                    }
                </div>
            </div>
            
            <CSSTransition
                in={showPopup && currTrailerId.length > 0}
                timeout={500}
                classNames="animation"
                mountOnEnter
                unmountOnExit
            >
                <VideoPopup 
                    currTrailerUrl={currTrailerId} 
                    setShowPopup={setShowPopup} 
                />
            </CSSTransition>
        </>
    );

}

export default Slider;
