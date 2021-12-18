class Painter {
    canvas;
    rows;
    cols;
    cellsize;
    pointRadius;

    constructor(canvas, rows, cols, cellsize) {
        this.canvas = canvas;
        this.rows = rows;
        this.cols = cols;
        this.cellsize = cellsize;
        this.pointRadius = 3;
    }

    drawGrid() {
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#303030";
        ctx.lineWidth = 1;

        for (var i = 0; i <= this.cols; i++) {
            ctx.beginPath();
            ctx.moveTo(this.cellsize * i, 0);
            ctx.lineTo(this.cellsize * i, this.cellsize * this.rows);
            ctx.stroke();
        }

        for (var j = 0; j <= this.rows; j++) {
            ctx.beginPath();
            ctx.moveTo(0, this.cellsize * j);
            ctx.lineTo(this.cellsize * this.cols, this.cellsize * j);
            ctx.stroke();
        }
    }

    drawPoint(x, y, color, id) {

        var ctx = canvas.getContext('2d');
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.arc(x * this.cellsize, y * this.cellsize, this.pointRadius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.arc(x * this.cellsize, y * this.cellsize, this.pointRadius - 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.stroke();
    }

    drawPaths(paths, color) {
        for (var i = 0; i < paths.length; i++)
            this.drawPath(paths[i], color);
    }

    drawPath(points, color) {
        if (points.length == 0) return;

        this.fillPath(points, color);

        for (var i = 0; i < points.length - 1; i++)
            this.drawConnector(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, color);

        this.drawConnector(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y, color);
    }

    drawConnector(x1, y1, x2, y2, color) {
        var ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x1 * this.cellsize, y1 * this.cellsize);
        ctx.lineTo(x2 * this.cellsize, y2 * this.cellsize);
        ctx.stroke();
    }


    fillPath(points, color) {
        let colors = ['#1a1a1a', color];
        let opacity = [1, 0.2];
        var ctx = this.canvas.getContext('2d');

        for (var i = 0; i < 2; i++) {
            ctx.fillStyle = colors[i];
            ctx.globalAlpha = opacity[i];

            ctx.beginPath();
            ctx.moveTo(points[0].x * this.cellsize, points[0].y * this.cellsize);

            for (var j = 1; j < points.length; j++)
                ctx.lineTo(points[j].x * this.cellsize, points[j].y * this.cellsize);

            ctx.fill();
        }

        ctx.globalAlpha = 1;

        for (var i = 0; i < points.length; i++)
            this.drawPoint(points[i].x, points[i].y, color, points[i].id);
    }

    getColorRectCode(currentPlayer) {
        if (currentPlayer == 'blue')
            return '&#x1F7E6;';
        else
            return '&#x1F7E5;';
    }

}


