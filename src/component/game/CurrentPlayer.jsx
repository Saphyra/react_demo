import React from 'react';

const CurrentPlayer = ({ player }) => {
    return (
        <div
            className="current-player">
            Current player: <span className="player-name">{player}</span>
        </div>
    );
}

export default CurrentPlayer;
