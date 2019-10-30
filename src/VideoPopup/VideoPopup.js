import React, { useRef } from 'react';
import './VideoPopup.sass';
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer';

function VideoPopup({ currTrailerUrl, setShowPopup }) {
    const videoPopupContentRef = useRef();

    const closePopup = (e) => {
        if (videoPopupContentRef.current.contains(e.target)) {
            return;
        }
        setShowPopup(false);
    }
    
    return (
        <div className='video-popup' onClick={closePopup} >
            <span className='video-popup__content' ref={videoPopupContentRef}>
                <div className="video-popup__media">
                    <YoutubePlayer id={currTrailerUrl} />
                </div>
            </span>
        </div>
    );
}

export default VideoPopup;