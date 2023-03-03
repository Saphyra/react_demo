const ColumnData = class {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.winner = false;
    }
}

export default ColumnData;
