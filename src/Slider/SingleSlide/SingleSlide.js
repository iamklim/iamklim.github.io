import React from 'react';
import './SingleSlide.sass';
import emptyPoster from '../../assets/img/empty-poster.png';

function SingleSlide({ movie, setShowPopup, setCurrTrailerUrl }) {

    const genreList = (
        <>
            {movie.genres.map((item) =>
                <div key={item.id} className="item__genre-element">
                    <div className={`item__genre-icon item__genre-icon--${item.id}`} />
                    <div className="item__genre-name" >{item.name}</div>
                </div>
            )}
        </>
    );

    const posterSrc = movie.poster !== null ? (
        movie.poster
    ) : (
            emptyPoster
        );
    
    const openVideo = (e) => {
        e.preventDefault();
        const currTrailerUrl = e.target.getAttribute('href');
        setCurrTrailerUrl(currTrailerUrl);
        setShowPopup(true);
    }

    return (
        <div className="swiper-slide item">
            <div className="item__description item__title">
                <span>{`${movie.title} (${movie.year})`}</span>
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

                    {!isNaN(movie.metascore) &&
                        <div className="item__sidebar item__sidebar--metascore">
                            <span className="item__sidebar-title item__sidebar-title--sm">Критики</span>
                            <span className="item__sidebar-number">{movie.metascore + '%'}</span>
                        </div>
                    }

                    {movie.trailer_url.length > 0 &&
                        <div className="item__sidebar item__sidebar--trailer">
                            <span className="item__sidebar-title item__sidebar-title--sm">Трейлер</span>
                            <span className="item__sidebar-icon item__sidebar-icon--youtube" />
                            <a className="item__sidebar-link" href={movie.trailer_url} onClick={openVideo}>Youtube</a>
                        </div>
                    }

                    <div className="item__genre">
                        <div className="item__sidebar item__genre-box item__genre-box--sm">
                            {genreList}
                        </div>
                        <div className="item__sidebar item__genre-box item__genre-box--lg">
                            {genreList}
                        </div>
                    </div>

                </div>

            </div>


            <div className="item__description item__bottom">

                <div className="item__cast">
                    <span className="item__director">
                        Режиссер: <span>{movie.director}</span>
                    </span>
                    <span className="item__actors">
                        В ролях: <span>{movie.actors}</span>
                    </span>
                </div>

                <div className="item__overview">
                    <span>{movie.overview}</span>
                </div>
            </div>
        </div>
    );

}

export default SingleSlide;
