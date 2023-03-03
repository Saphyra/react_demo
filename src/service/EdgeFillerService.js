import BoardDimensions from "./BoardDimensions";
import ColumnData from "../dto/ColumnData";

const addColumnsToEdgeIfNecessary = (columns) => {
    const boardDimensions = new BoardDimensions(columns)

    addRowIfContains(columns, boardDimensions.minY, boardDimensions.minY - 1, boardDimensions, "minY");
    addRowIfContains(columns, boardDimensions.maxY, boardDimensions.maxY + 1, boardDimensions, "maxY");
    addColumnIfContains(columns, boardDimensions.minX, boardDimensions.minX - 1, boardDimensions, "minX");
    addColumnIfContains(columns, boardDimensions.maxX, boardDimensions.maxX + 1, boardDimensions, "maxX");

    return columns;
}

const addRowIfContains = (columns, y, newY, boardDimensions, prop) => {
    const shouldAddRow = columns.filter((column) => { return column.y === y })
        .filter((column) => column.player != null)
        .length > 0;

    if (shouldAddRow) {
        for (let x = boardDimensions.minX; x <= boardDimensions.maxX; x++) {
            columns.push(new ColumnData(x, newY, null));
        }

        boardDimensions[prop] = newY;
    }
}

const addColumnIfContains = (columns, x, newX, boardDimensions, prop) => {
    const shouldAddColumns = columns.filter((column) => { return column.x === x })
        .filter((column) => { return column.player != null })
        .length > 0;

    if (shouldAddColumns) {
        for (let y = boardDimensions.minY; y <= boardDimensions.maxY; y++) {
            columns.push(new ColumnData(newX, y, null));
        }

        boardDimensions[prop] = newX;
    }
}

export default addColumnsToEdgeIfNecessary;
