class Grid {
    cols;
    rows;
    points = [];
    cycles = [];
    pointIdCounter = 0;

    constructor(cols, rows, step) {
        this.cols = cols;
        this.rows = rows;
        this.step = step;
    }

    createPoint(x, y, player) {
        const p = new Point(x, y, player, this.generatePointId());
        this.points.push(p);

        return p.id;
    }

    generatePointId() {
        return this.pointIdCounter++;
    }

    getPointByID(pointID) {
        return this.points.find(point => (point.id === pointID));
    }

    getPointsByID(pointIDs) {
        let points = [];
        for (var i = 0; i < pointIDs.length; i++)
            points.push(this.getPointByID(pointIDs[i]));

        return points;
    }

    getPointsByPlayer(player) {
        return this.points.filter(point => (point.player === player && point.active));
    }

    getPointAt(x, y) {
        return this.points.find(point => (point.x === x && point.y === y));
    }

    findCyclesByPlayer(player) {
        let points = this.getPointsByPlayer(player);
        let visited = [];
        let stack = [];
        let paths = [];

        if (points.length < 4) return stack;

        console.clear();

        for (var i = 0; i < points.length; i++) {
            visited = [];
            stack = [];

            this.dfs(points[i], -1, points, visited, stack);

            if (stack.length > 0) {
                let path = this.getPointsByID(stack);
                if (this.getNeighborPoints(-1, path[0]).find(point => (point.id === stack[stack.length - 1])) !== undefined) {
                    paths.push(stack);
                }
            }
        }

        let result = [];
        if (paths.length > 0) {
            let enemyPoints;

            for (var j = paths.length - 1; j >= 0; j--) {
                enemyPoints = this.findEnemyPoints(this.getPointsByID(paths[j]));
                if (enemyPoints.length === 0)
                    paths.splice(j, 1);
                else
                    result.push(this.getPointsByID(paths[j]));
            }
        }

        console.log(result);

        return result;
    }

    dfs(p, parentPointID, points, visited, stack) {

        if (visited.indexOf(p.id) === -1) {
            visited.push(p.id);

            let neighbors = this.getNeighborPoints(parentPointID, p);
            for (var i = 0; i < neighbors.length; i++)
                if (visited.indexOf(neighbors[i].id) !== -1 || !this.dfs(neighbors[i], p.id, points, visited, stack)) {
                    stack.push(p.id);

                    // a cycle was found
                    return false;
                }

            // a cycle was not found
            return true;
        }

        // a cycle was found
        return false;
    }

    getNeighborPoints(parentID, p) {
        let neighbors = [];

        if (p === undefined) return [];

        var parent;
        var x;
        var y;

        if (parentID !== -1) {
            parent = this.getPointByID(parentID);
            x = parent.x - p.x;
            y = parent.y - p.y;
        } else {
            x = 1;
            y = 0;
        }

        // top row in a matrix
        if (x === -1 && y === -1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        if (x === 0 && y === -1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        if (x === 1 && y === -1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        // right center element in a matrix
        if (x === 1 && y === 0) {
            // point 1
            var testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        // bottom row in a matrix
        if (x === 1 && y === 1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        if (x === 0 && y === 1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        if (x === -1 && y === 1) {
            // point 1
            var testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }

        // left center element in a matrix
        if (x === -1 && y === 0) {
            // point 1
            var testPoint = this.validateNaighbor(p.x - 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 2
            testPoint = this.validateNaighbor(p.x, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 3
            testPoint = this.validateNaighbor(p.x + 1, p.y - 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 4
            testPoint = this.validateNaighbor(p.x + 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 5
            testPoint = this.validateNaighbor(p.x + 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 6
            testPoint = this.validateNaighbor(p.x, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 7
            testPoint = this.validateNaighbor(p.x - 1, p.y + 1, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            // point 8
            testPoint = this.validateNaighbor(p.x - 1, p.y, p.player, parentID);
            if (testPoint !== undefined)
                neighbors.push(testPoint);

            return neighbors;
        }
    }

    validateNaighbor(x, y, player, parentID) {
        var testPoint = this.getPointAt(x, y);
        if (testPoint !== undefined)
            if (testPoint.active)
                if (testPoint.player === player && testPoint.id !== parentID && testPoint.active)
                    return testPoint;

        return undefined;
    }

    getTopPoint(points) {
        if (points.length < 2) return -1;
        points.sort((a, b) => (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0));

        return points[0];
    }

    getBottomPoint(points) {
        if (points.length < 2) return -1;
        points.sort((a, b) => (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0));

        return points[points.length - 1];
    }

    getLeftPoint(points, y) {
        if (points.length < 1) return -1;
        return points.filter(point => (point.y === y)).sort((a, b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))[0];
    }

    getRightPoint(points, y) {
        if (points.length < 1) return -1;
        let result = points.filter(point => (point.y === y)).sort((a, b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))
        return result[result.length - 1];
    }

    getEnemyPlayer(player) {
        if (player === 'red') return 'blue';
        else return 'red';
    }

    findEnemyPoints(points) {
        let result = [];

        if (points.length === 0) return result;
        var topPoint = this.getTopPoint(points);
        var bottomPoint = this.getBottomPoint(points);
        let enemyPoints = this.getPointsByPlayer(this.getEnemyPlayer(points[0].player));

        for (var i = topPoint.y + 1; i < bottomPoint.y; i++) {
            var left = this.getLeftPoint(points, i).x;
            var right = this.getRightPoint(points, i).x;
            let enemyPointsInALine = enemyPoints.filter(point => (point.y === i && point.x > left && point.x < right));
            for (var j = 0; j < enemyPointsInALine.length; j++) {
                enemyPointsInALine[j].active = false;
                result.push(enemyPointsInALine[j]);
            }
        }

        return result;
    }
}

class Point {
    id;
    x;
    y;
    player;
    active;

    constructor(x, y, player, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.player = player;
        this.active = true;
    }
}