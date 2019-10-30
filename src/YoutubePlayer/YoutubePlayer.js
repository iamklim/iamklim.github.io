import React, { useEffect } from 'react';
import './YoutubePlayer.sass';

function YoutubePlayer({ id }) {

    useEffect(() => {
        // On mount, check to see if the API script is already loaded
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else { // If script is already there, load the video directly
            loadVideo();
        }
    }, []);

    const loadVideo = () => {
        // the Player object is created uniquely based on the id in props
        let player = new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            height: "100%",
            width: "100%",
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 0,
            events: {
                onReady: onPlayerReady,
            },
        });
    };

    const onPlayerReady = event => {
        event.target.setVolume(100);
        event.target.playVideo();
    };

    return (
        <div id={`youtube-player-${id}`} />
    );
}

export default YoutubePlayer;