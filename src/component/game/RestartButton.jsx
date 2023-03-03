import React from 'react';

const RestartButton = ({ resetGame }) => {
    return (
        <button
            className="restart-button"
            onClick={resetGame}>
            Restart
        </button>
    );
}

export default RestartButton;
