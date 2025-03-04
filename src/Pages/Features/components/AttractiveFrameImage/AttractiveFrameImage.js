import React from 'react';
import AttractiveFrame from '../../../../assets/AttractiveFrame.png';

const AttractiveFrameImage = () => {
    return (
        <img 
            src={AttractiveFrame} 
            alt="Attractive FxXrame" 
            className="corner-frame"
            style={{
                position: 'absolute',
                top: '200px', 
                right: '100px',
                width: '360px',
                height: 'auto',
                zIndex: 1000,
                animation: 'moveUpDown 3s ease-in-out infinite'
            }}
        />
    );
};

export default AttractiveFrameImage; 