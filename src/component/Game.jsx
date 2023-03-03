import React, { useEffect } from 'react';
import { useState } from 'react';
import addColumnsToEdgeIfNecessary from '../service/EdgeFillerService';
import getWinner from '../service/WinnerService';
import Board from './game/Board';
import ColumnData from '../dto/ColumnData';
import Constants from '../dto/Constants';
import CurrentPlayer from './game/CurrentPlayer';
import RestartButton from './game/RestartButton';
import Winner from './game/Winner';

const Game = () => {
  const [currentPlayer, serCurrentPlayer] = useState(null);
  const [columns, setColumns] = useState([]);
  const [hasWinner, setWinner] = useState(false);

  useEffect(() => {setColumns(defaultBoard())}, []);
  useEffect(() => {serCurrentPlayer(randomPlayer())}, []);

  const randomPlayer = () => {
    return Math.random() > 0.5 ? Constants.PLAYER_X : Constants.PLAYER_O;
  }

  const defaultBoard = () => {
    return [new ColumnData(0, 0, null)];
  }

  const resetGame = () => {
    serCurrentPlayer(randomPlayer());
    setColumns(defaultBoard());
    setWinner(false);
  }

  const columnModified = (newColumns) => {
    const winnerResult = getWinner(newColumns);

    if (winnerResult.length >= 5) {
      setWinner(true);
      winnerResult.forEach((columnData) => columnData.winner = true);
      setColumns(newColumns);
    } else {
      const filledColumns = addColumnsToEdgeIfNecessary(newColumns);

      setColumns(filledColumns);
      serCurrentPlayer(getAnotherPlayer(currentPlayer));
    }
  }

  const getAnotherPlayer = (currentPlayer) => {
    return currentPlayer === Constants.PLAYER_X ? Constants.PLAYER_O : Constants.PLAYER_X;
  }

  return (
    (
      <div>
        <RestartButton resetGame={resetGame} />
        <CurrentPlayer player={currentPlayer} />
        <Board
          columns={columns}
          currentPlayer={currentPlayer}
          columnModified={columnModified}
          hasWinner={hasWinner}
        />
        {hasWinner && <Winner player={currentPlayer} />}
      </div>
    )
  );
}

export default Game;
