import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Swiper from "swiper";

import "swiper/dist/css/swiper.css";
import "./Slider.sass";

import SingleSlide from "./SingleSlide/SingleSlide";
import VideoPopup from "../VideoPopup/VideoPopup";

const Slider = ({ movies, moviesAreSorted, onInit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currTrailerId, setCurrTrailerId] = useState("");

  const initSlider = () => {
    new Swiper(".swiper-container", {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "auto",
      mousewheel: {
        eventsTarged: ".item__img",
      },
      keyboard: true,
      slideToClickedSlide: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false, // Done using CSS
      },
      on: {
        init: () => {
          onInit(true);
        },
      },
    });
  };

  useEffect(() => {
    if (moviesAreSorted) {
      initSlider();
    }
  }, [moviesAreSorted]);

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
            ))}
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
};

export default Slider;
