import React from 'react';
import ColumnData from "../../../dto/ColumnData";

const Column = ({ columnData, currentPlayer, columnModified, hasWinner }) => {
    const assign = () => {
        if (columnData.player) {
            return;
        }

        if (hasWinner) {
            return;
        }

        const newColumnData = new ColumnData(columnData.x, columnData.y, currentPlayer);
        columnModified(newColumnData);
    }

    const getClassName = () => {
        return [
            "board-column",
            columnData.player ? "occupied" : "empty",
            columnData.winner ? "winner" : ""
        ].join(" ");
    }

    return (
        <div className={getClassName()}
            onClick={assign}
            title={columnData.x + " / " + columnData.y} >
            {columnData.player || "."}
        </div>
    );
}

export default Column;
