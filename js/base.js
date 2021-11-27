var canvas = document.getElementById('gameGrid');
var player = document.getElementById('player');
var scoreRedHTMLElement = document.getElementById('redscore');
var scoreBlueHTMLElement = document.getElementById('bluescore');

// Game settings.
const settingCols = 40;
const settingRows = 20;
const settingCellsize = 30;
const settingPlayerRedColor = '#fb3e3e';
const settingPlayerBlueColor = '#0078d7';


let view = new View(settingCols, settingRows, settingCellsize, canvas, player, settingPlayerRedColor, settingPlayerBlueColor, scoreRedHTMLElement, scoreBlueHTMLElement);

function start() {
    view.painter.drawGrid();
}

function userClick(e) {
    view.addPoint(e.offsetX, e.offsetY);
}
