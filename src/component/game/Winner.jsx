import React from 'react';

const Winner = ({ player }) => {
    return (
        <div
            className="winner-player">
            Congratulations, <span className="player-name">'{player}'</span>!
        </div>
    );
}

export default Winner;
