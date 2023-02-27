import React from 'react';

export default function RestartButton({resetGame}){
    return <button className="restart-button" onClick={resetGame}>Restart</button>
}