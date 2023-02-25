import ColumnData from "../../../structure/ColumnData";

export default function Column({ columnData, currentPlayer, columnModified, hasWinner}) {
    return <div className={"board-column " + (columnData.player ? "occupied" : "empty") + " " + (columnData.winner ? "winner" : "")} onClick={assign} title={columnData.x + " / " + columnData.y}>{columnData.player || "."}</div>

    function assign() {
        if (columnData.player) {
            return;
        }

        if(hasWinner){
            return;
        }

        const newColumnData = new ColumnData(columnData.x, columnData.y, currentPlayer);
        columnModified(newColumnData);
    }
}