import React, { useRef } from 'react';
import './VideoPopup.sass';

function VideoPopup({ currTrailerUrl, setShowPopup }) {
    const videoPopupContentRef = useRef();

    const closePopup = (e) => {
        if (videoPopupContentRef.current.contains(e.target)) {
            return;
        }
        setShowPopup(false);
    }

    // Using YT API https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution
    // https://developers.google.com/youtube/v3/getting-started
    //  if (!window.YT) {
    
    return (
        <div className='video-popup' onClick={closePopup} >
            <span className='video-popup__content' ref={videoPopupContentRef}>
                <div className="video-popup__media">
                    <iframe 
                        className="video-popup__iframe" 
                        src={currTrailerUrl} 
                        frameBorder="0" 
                        allow="autoplay; encrypted-media"
                        allowFullScreen 
                    />
                </div>
            </span>
        </div>
    );
}

export default VideoPopup;