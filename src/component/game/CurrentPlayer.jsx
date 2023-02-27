import React from 'react';

export default function CurrentPlayer({player}){
    return <div className="current-player">Current player: <span className="player-name">{player}</span></div>
}