const BoardDimensions = class {
    constructor(columns) {
        this.minX = Number.MAX_SAFE_INTEGER;
        this.maxX = Number.MIN_SAFE_INTEGER;
        this.minY = Number.MAX_SAFE_INTEGER;
        this.maxY = Number.MIN_SAFE_INTEGER;

        columns.forEach((column) => {
            if (column.x < this.minX) {
                this.minX = column.x
            }

            if (column.x > this.maxX) {
                this.maxX = column.x;
            }

            if (column.y < this.minY) {
                this.minY = column.y
            }

            if (column.y > this.maxY) {
                this.maxY = column.y;
            }
        })
    }
}

export default BoardDimensions;
