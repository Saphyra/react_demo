import Column from "./column/Column";

export default function Board({ columns, currentPlayer, columnModified, hasWinner }) {
    const rows = mapRows(columns);

    return <div className="board">
        {
            Object.keys(rows)
                .sort((a, b) => { return a - b })
                .map((rowIndex) => {
                    return <div key={rowIndex} className="board-row">
                        {
                            rows[rowIndex]
                                .sort((a, b) => { return a.x - b.x })
                                .map((columnData) => {
                                    return columnData;
                                })
                                .map((columnData) => <Column key={columnData.x} columnData={columnData} currentPlayer={currentPlayer} columnModified={replaceColumn} hasWinner={hasWinner} />)
                        }
                    </div>
                })
        }
    </div>

    function replaceColumn(newColumnData) {
        const originalColumn = columns.filter((columnData) => { return columnData.x == newColumnData.x && columnData.y == newColumnData.y })[0];

        const columnsClone = columns.slice();

        columnsClone.splice(columns.indexOf(originalColumn), 1);

        columnsClone.push(newColumnData);


        columnModified(columnsClone);
    }

    function mapRows(columns) {
        const result = {};

        columns.forEach(element => {
            let arr = result[element.y];
            if (!arr) {
                arr = [];
                result[element.y] = arr;
            }

            arr.push(element);
        });

        return result;
    }
}