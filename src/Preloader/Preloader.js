import React from 'react';
import './Preloader.sass';

class Preloader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let loader = document.getElementById('loader'),
            loaderClass = 'loader';

        if (this.props.contentLoaded) {
            loaderClass += ' loader--hidden';
            setTimeout(function () {
                loader.style.display = 'none'
            }, 610)
        }

        return (
            <div className={loaderClass} id="loader">
                <div className="loader__spinner">
                    <div className="loader__spinner-square"  />
                </div>
            </div>
        );
    }
}

export default Preloader;