import React, { useEffect, useState } from 'react';
import Column from "./board/Column";

const Board = ({ columns, currentPlayer, columnModified, hasWinner }) => {
    const [rows, setRows] = useState({});
    useEffect(() => mapRows(), [columns]);

    const mapRows = () => {
        const result = {};

        columns.forEach(element => {
            let arr = result[element.y];
            if (!arr) {
                arr = [];
                result[element.y] = arr;
            }

            arr.push(element);
        });

        setRows(result);
    }

    const replaceColumn = (newColumnData) => {
        const originalColumn = columns.filter((columnData) => { return columnData.x === newColumnData.x && columnData.y === newColumnData.y })[0];

        const columnsClone = columns.slice();

        columnsClone.splice(columns.indexOf(originalColumn), 1);

        columnsClone.push(newColumnData);

        columnModified(columnsClone);
    }

    const getRows = () => {
        return Object.keys(rows)
            .sort((a, b) => { return a - b })
            .map((rowIndex) => {
                return <div key={rowIndex} className="board-row">
                    { getColumns(rowIndex) }
                </div>
            });
    }

    const getColumns = (rowIndex) => {
        return rows[rowIndex]
            .sort((a, b) => { return a.x - b.x })
            .map((columnData) =>
                <Column
                    key={columnData.x}
                    columnData={columnData}
                    currentPlayer={currentPlayer}
                    columnModified={replaceColumn}
                    hasWinner={hasWinner}
                />);
    }

    return (
        <div className="board">
            { getRows() }
        </div>
    );
}

export default Board;
