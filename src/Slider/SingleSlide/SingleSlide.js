import React from 'react';
import './SingleSlide.sass';
import emptyPoster from '../../assets/img/empty-poster.png';

function SingleSlide({ movie, setShowPopup, setCurrTrailerId }) {

    const genreList = movie.genres ? (
        <>
            {movie.genres.map((item) => 
                <div key={item.id} className="item__genre-element">
                    <div className={`item__genre-icon item__genre-icon--${item.id}`} />
                    <div className="item__genre-name" >{item.name}</div>
                </div>
            )}
        </>
    ) : null;

    const posterSrc = movie.poster ? (
        movie.poster
    ) : (
            emptyPoster
        );
    
    const openVideo = (e) => {
        e.preventDefault();
        const currTrailerId = e.target.getAttribute('data-trailer-id');
        setCurrTrailerId(currTrailerId);
        setShowPopup(true);
    }

    return (
        <div className="swiper-slide item">
            <div className="item__description item__title">
                <span>{`${movie.title} ${movie.year ? '(' + movie.year + ')' : ''}`}</span>
            </div>

            <div className="item__img">
                <img src={posterSrc} alt="Poster" />

                <div className="item__shadow item__shadow--left" />
                <div className="item__shadow item__shadow--right" />

                <div className="item__description item__marks">
                    <div className=" item__sidebar item__sidebar--imdb">
                        <span className="item__sidebar-title">IMDb</span>
                        <span className="item__sidebar-number">{movie.imdbRating}</span>
                    </div>

                    {movie.metascore &&
                        <div className="item__sidebar item__sidebar--metascore">
                            <span className="item__sidebar-title item__sidebar-title--sm">Критики</span>
                            <span className="item__sidebar-number">{`${movie.metascore}%`}</span>
                        </div>
                    }

                    {movie.trailerId &&
                        <div className="item__sidebar item__sidebar--trailer">
                            <span className="item__sidebar-title item__sidebar-title--sm">Трейлер</span>
                            <span className="item__sidebar-icon item__sidebar-icon--youtube" />
                            <a 
                                className="item__sidebar-link"
                                data-trailer-id={movie.trailerId} 
                                href={`https://www.youtube.com/watch?v=${movie.trailerId}`} 
                                onClick={openVideo}>
                                    Youtube
                            </a>
                        </div>
                    }

                    {genreList &&
                        <div className="item__genre">
                            <div className="item__sidebar item__genre-box item__genre-box--sm">
                                {genreList}
                            </div>
                            <div className="item__sidebar item__genre-box item__genre-box--lg">
                                {genreList}
                            </div>
                        </div>
                    }

                </div>

            </div>


            <div className="item__description item__bottom">

                <div className="item__cast">
                    {movie.director && 
                        <span className="item__director">
                            Режиссер: <span>{movie.director}</span>
                        </span>
                    }
                    {movie.actors &&
                        <span className="item__actors">
                            В ролях: <span>{movie.actors}</span>
                        </span>
                    }
                </div>

                <div className="item__overview">
                    <span>{movie.overview}</span>
                </div>
            </div>
        </div>
    );

}

export default SingleSlide;
