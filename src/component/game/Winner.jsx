import React from 'react';

export default function Winner({ player }) {
    return <div className="winner-player">Congratulations, '<span className="player-name">{player}</span>'!</div>
}