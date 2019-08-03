import React from 'react';
import 'swiper/dist/css/swiper.css';
import './Slide.css';

class SingleSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="swiper-slide slide">
                <div className="slide__img">
                    <img src={this.props.movie.poster} alt="Poster" />
                </div>
                <div className="slide__title">
                    <span>
                        {this.props.movie.title}
                    </span>
                </div>
                <div className="slide__imdbRating">
                    <span>
                        {this.props.movie.imdbRating}
                    </span>
                </div>
                <div className="slide__overview">
                    <span>
                        {this.props.movie.overview}
                    </span>
                </div>
            </div>
        );
    }
}

export default SingleSlide;