import React from 'react';
import './ErrorFallback.sass';
import ErrorIcon from '../assets/img/emojii-facepalm.png'

const ErrorFallback = () => {
    return (
        <div className="error-fallback">
            <div className="error-fallback__content">
            <span className="error-fallback__content-text">
                Что-то не завелось <img src={ErrorIcon} className="error-fallback__content-icon" alt="Error icon" />
            </span>
            <span className="error-fallback__content-text">Попробуйте перезагрузить страницу</span>
            </div>
        </div>
    );
}

export default ErrorFallback;
