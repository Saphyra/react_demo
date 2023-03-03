import BoardDimensions from "./BoardDimensions";
import Constants from "../dto/Constants";

const getWinner = (columns) => {
    const boardDimensions = new BoardDimensions(columns);

    const result = [];

    for (let y = boardDimensions.minY; y <= boardDimensions.maxY; y++) {
        for (let x = boardDimensions.minX; x <= boardDimensions.maxX; x++) {
            const columnData = findByCoordinate(columns, x, y);
            if (columnData.player) {
                const horizontalMatch = checkHorizontalMatch(columns, columnData, boardDimensions);
                const verticalMatch = checkVerticalMatch(columns, columnData, boardDimensions);
                const ascendingMatch = checkAscendingMatch(columns, columnData, boardDimensions);
                const descendingMatch = checkDescendingMatch(columns, columnData, boardDimensions);

                appendIfLengthAtLeast(result, 5, horizontalMatch, verticalMatch, ascendingMatch, descendingMatch);
            }
        }
    }

    return Array.from(new Set(result));
}

const checkHorizontalMatch = (columns, columnData, boardDimensions) => {
    const endX = columnData.x + Constants.MATCH_LENGTH;
    if (boardDimensions.maxX < endX) {
        return [];
    }

    const result = [columnData];

    for (let x = columnData.x + 1; x <= endX; x++) {
        const maybeMatch = findByCoordinate(columns, x, columnData.y);
        if (maybeMatch.player === columnData.player) {
            result.push(maybeMatch);
        } else {
            return [];
        }
    }

    return result;
}

const checkVerticalMatch = (columns, columnData, boardDimensions) => {
    const endY = columnData.y + Constants.MATCH_LENGTH;
    if (boardDimensions.maxY < endY) {
        return [];
    }

    const result = [columnData];

    for (let y = columnData.y + 1; y <= endY; y++) {
        const maybeMatch = findByCoordinate(columns, columnData.x, y);
        if (maybeMatch.player === columnData.player) {
            result.push(maybeMatch);
        } else {
            return [];
        }
    }

    return result;
}

const checkAscendingMatch = (columns, columnData, boardDimensions) => {
    const endX = columnData.x + Constants.MATCH_LENGTH;
    const endY = columnData.y - Constants.MATCH_LENGTH;

    if (boardDimensions.maxX < endX || boardDimensions.minY > endY) {
        return [];
    }

    const result = [columnData];

    for (let x = columnData.x + 1, y = columnData.y - 1; x <= endX; x++, y--) {
        const maybeMatch = findByCoordinate(columns, x, y);
        if (maybeMatch.player === columnData.player) {
            result.push(maybeMatch);
        } else {
            return [];
        }
    }

    return result;
}

const checkDescendingMatch = (columns, columnData, boardDimensions) => {
    const endX = columnData.x + Constants.MATCH_LENGTH;
    const endY = columnData.y + Constants.MATCH_LENGTH;

    if (boardDimensions.maxX < endX || boardDimensions.maxY < endY) {
        return [];
    }

    const result = [columnData];

    for (let x = columnData.x + 1, y = columnData.y + 1; x <= endX; x++, y++) {
        const maybeMatch = findByCoordinate(columns, x, y);
        if (maybeMatch.player === columnData.player) {
            result.push(maybeMatch);
        } else {
            return [];
        }
    }

    return result;
}

const findByCoordinate = (columns, x, y) => {
    const match = columns.filter((columnData) => { return columnData.x === x && columnData.y === y });

    if (match.lenth === 0) {
        return null;
    }

    return match[0];
}

const appendIfLengthAtLeast = (arr, minimumLength, ...arrays) => {
    arrays.filter((a) => { return a.length >= minimumLength })
        .forEach((a) => a.forEach((columnData) => arr.push(columnData)));
}

export default getWinner;
