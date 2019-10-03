import React from 'react';
import 'swiper/dist/css/swiper.css';
import './Slider.sass';

import SingleSlide from './SingleSlide/SingleSlide';

class Slider extends React.Component {

    render() {
        console.log(this.props.movies)
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.moviesAreSorted &&
                        this.props.movies.map((item) => (
                            <SingleSlide key={item.id} movie={item}/>
                        ))
                    }
                    
                </div>
            </div>
        );
    }
}

export default Slider;
