import React from 'react';
import './SingleSlide.sass';

class SingleSlide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //let metascore = isNaN(this.props.movie.metascore) ? '-' : this.props.movie.metascore + '%';
        // let genreList = (
        //     <ul className="item__genre-list">
        //         {this.props.movie.genres.map((item) =>
        //             <li className="item__genre-element">{item}</li>
        //         )}
        //     </ul>
        // );
        return (
            <div className="swiper-slide item">
                <div className="item__description item__title">
                    <span>{this.props.movie.title}</span>
                </div>

                <div className="item__img">
                    <img src={this.props.movie.poster} alt="Poster" />

                    <div className="item__description item__marks">
                        <div className=" item__sidebar item__sidebar--imdb">
                            <span className="item__sidebar-title">IMDb</span>
                            <span className="item__sidebar-number">{this.props.movie.imdbRating}</span>
                        </div>

                        {!isNaN(this.props.movie.metascore) &&
                            <div className="item__sidebar item__sidebar--metascore">
                                <span className="item__sidebar-title item__sidebar-title--sm">Критики</span>
                                <span className="item__sidebar-number">{this.props.movie.metascore + '%'}</span>
                            </div>
                        }

                        {this.props.movie.trailer_url.length > 0 &&
                            <div className="item__sidebar item__sidebar--trailer">
                                <span className="item__sidebar-title item__sidebar-title--sm">Трейлер</span>
                                <span className="item__sidebar-icon item__sidebar-icon--youtube"/>
                                <a className="item__sidebar-link" href={this.props.movie.trailer_url} />
                            </div>
                        }
                    </div>

                    <div className="item__description item__genres">
                        {this.props.movie.genres.map((item) =>
                            <span className="item__genres-element">
                                <span className={`item__genres-icon item__genres-icon--${item.id}`} />
                                <span className="item__genres-name" >{item.name}</span>
                            </span>
                        )}
                    </div>

                </div>


                <div className="item__description item__bottom">

                    <div className="item__cast">
                        <span className="item__director">
                            Режиссер: <span>{this.props.movie.director}</span>
                        </span>
                        <span className="item__actors">
                            В ролях: <span>{this.props.movie.actors}</span>
                        </span>
                    </div>

                    <div className="item__overview">
                        <span>{this.props.movie.overview}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleSlide;