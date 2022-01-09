import React from 'react';

import './error-indicator.css';
import icon from './snejinka.png';

const ErrorIndicator = () => {
    return(
        <div className='error-indicator'>
            <img src={icon} alt="test icon"></img>
            <span>something has gone wrong!</span>
        </div>
    )
}

export default ErrorIndicator;