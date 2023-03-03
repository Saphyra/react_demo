import React from "react";
import ColumnData from "../../../structure/ColumnData";

const Column = ({ columnData, currentPlayer, columnModified, hasWinner }): JSX.Element => {
    const assign = () => {
        if (columnData.player) {
            return;
        }

        if(hasWinner){
            return;
        }

        const newColumnData = new ColumnData(columnData.x, columnData.y, currentPlayer);
        columnModified(newColumnData);
    }

    return (
        <div 
            className={"board-column " + (columnData.player ? "occupied" : "empty") + " " + (columnData.winner ? "winner" : "")} 
            onClick={assign} 
            title={columnData.x + " / " + columnData.y}
        >
                {columnData.player || "."}
        </div>
    )
}

export default Column;