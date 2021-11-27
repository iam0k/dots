class View {

    grid;
    painter;
    cellsize;
    currentPlayer = 'red';
    playerRedColor;
    playerBlueColor;
    scoreRed;
    scoreBlue;

    constructor(cols, rows, cellsize, canvas, playerIndicator, playerRedColor, playerBlueColor, scoreRedHTMLElement, scoreBlueHTMLElement) {
        this.grid = new Grid(cols, rows, cellsize);
        this.painter = new Painter(canvas, rows, cols, cellsize, playerIndicator, playerRedColor, playerBlueColor);
        this.cellsize = cellsize;
        this.playerRedColor = playerRedColor;
        this.playerBlueColor = playerBlueColor;
        this.scoreRed = scoreRedHTMLElement;
        this.scoreBlue = scoreBlueHTMLElement;
    }

    addPoint(mouseX, mouseY) {
        var deltaX = this.cellsize - this.getNearestDelta(mouseX, this.cellsize);
        var deltaY = this.cellsize - this.getNearestDelta(mouseY, this.cellsize);
        var delta = 8;

        if ((deltaX < delta || deltaX > this.cellsize - delta) && (deltaY < delta || deltaY > this.cellsize - delta)) {

            var x = this.getNearestNumber(mouseX, this.cellsize);
            var y = this.getNearestNumber(mouseY, this.cellsize);

            if (!this.validateNewPoint(x, y))
                return;

            var pointID = this.grid.createPoint(x, y, this.currentPlayer);
            this.painter.drawPoint(x, y, this.getCurrentPlayerColor(), pointID);

            this.painter.drawPaths(this.grid.findCyclesByPlayer(this.currentPlayer), this.getCurrentPlayerColor());
            this.drawInactivePoints(this.grid.points.filter(point => (!point.active)));

            this.nextPlayer();
            this.painter.drawNextPlayer(this.currentPlayer);
            this.scoreRed.innerHTML = this.getGameScore('red');
            this.scoreBlue.innerHTML = this.getGameScore('blue');
        }
    }

    drawInactivePoints(points) {
        for (var i = 0; i < points.length; i++)
            this.painter.drawPoint(points[i].x, points[i].y, this.getPlayerColor(points[i].player), points[i].id);
    }

    getNearestNumber(value, multiple) {
        var rem = this.getNearestDelta(value, multiple);
        var result = value - rem;
        if (rem > (multiple / 2))
            result += multiple;
        return result / multiple;
    }

    getNearestDelta(value, multiple) {
        var rem = value % multiple;
        // if (rem === value)
        //     rem = multiple - value;
        return rem;
    }

    validateNewPoint(x, y) {
        return this.grid.points.find(point => (point.x == x && point.y == y)) == undefined;
    }

    nextPlayer() {
        if (this.currentPlayer == 'red')
            this.currentPlayer = 'blue';
        else
            this.currentPlayer = 'red';
    }

    getCurrentPlayerColor() {
        if (this.currentPlayer == 'red')
            return this.playerRedColor;
        else
            return this.playerBlueColor;
    }

    getPlayerColor(player) {
        if (player === 'red')
            return this.playerRedColor;
        else
            return this.playerBlueColor;
    }

    getGameScore(player) {
        if (player === 'red')
            return this.grid.points.filter(point => (point.player === 'red' && point.active)).length;
        if (player === 'blue')
            return this.grid.points.filter(point => (point.player === 'blue' && point.active)).length;

        return -1;
    }

}