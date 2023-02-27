import React from 'react';
import { useState } from 'react';
import addColumnsToEdgeIfNecessary from '../service/EdgeFillerService';
import getWinner from '../service/WinnerService';
import Board from './game/Board';
import ColumnData from '../dto/ColumnData';
import Constants from '../dto/Constants';
import CurrentPlayer from './game/CurrentPlayer';
import RestartButton from './game/RestartButton';
import Winner from './game/Winner';

export default function Game() {
  const [currentPlayer, serCurrentPlayer] = useState(randomPlayer());
  const [columns, setColumns] = useState(defaultBoard());
  const [hasWinner, setWinner] = useState(false);

  return (
    (
      <div>
        <RestartButton resetGame={resetGame} />
        <CurrentPlayer player={currentPlayer} />
        <Board columns={columns} currentPlayer={currentPlayer} columnModified={columnModified} hasWinner={hasWinner} />
        {
          hasWinner && <Winner player={currentPlayer} />
        }
      </div>
    )
  );

  function randomPlayer() {
    return Math.random() > 0.5 ? Constants.PLAYER_X : Constants.PLAYER_O;
  }

  function resetGame() {
    serCurrentPlayer(randomPlayer());
    setColumns(defaultBoard());
    setWinner(false);
  }

  function defaultBoard() {
    return [new ColumnData(0, 0, null)];
  }

  function columnModified(newColumns) {
    const winnerResult = getWinner(newColumns);
    if (winnerResult.length >= 5) {
      setWinner(true);
      winnerResult.forEach((columnData) => columnData.winner = true);
      setColumns(newColumns);
    } else {
      const filledColumns = addColumnsToEdgeIfNecessary(newColumns);

      setColumns(filledColumns);
      serCurrentPlayer(getAnotherPlayer(currentPlayer));

      function getAnotherPlayer(currentPlayer) {
        return currentPlayer == Constants.PLAYER_X ? Constants.PLAYER_O : Constants.PLAYER_X;
      }
    }
  }
}
