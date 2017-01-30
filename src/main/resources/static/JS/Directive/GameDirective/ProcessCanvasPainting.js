/* global ctx, canvas, playerNormalProjectileList, player, enemyList, enemyProjectileList, upgradeList, playerMissileProjectileList */

var canvas = document.getElementById('gameCanvas');
var canvasHeight = 500;
var canvasWidth = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext("2d");

function drawRectangleElement(element) {
    for (var i = 0; i < element.length; i++) {
        ctx.fillStyle = element[i].color;
        ctx.fillRect(
                element[i].x,
                element[i].y,
                element[i].larg,
                element[i].haut);
    }
}
function drawTriangleElement(elements) {
    for (var i = 0; i < elements.length; i++) {
        ctx.beginPath();
        ctx.moveTo(elements[i].x - elements[i].larg / 2, elements[i].y + elements[i].haut / 2);
        ctx.lineTo(elements[i].x + elements[i].larg / 2, elements[i].y + elements[i].haut / 2);
        ctx.lineTo(elements[i].x, elements[i].y - elements[i].haut / 2);
        ctx.closePath();
        // the outline
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#666666';
        ctx.stroke();

        // the fill color
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
    }



}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCanvas() {
    drawRectangleElement([player]);
    drawRectangleElement(playerNormalProjectileList);
    drawTriangleElement(playerMissileProjectileList);
    drawRectangleElement(enemyList);
    drawRectangleElement(enemyProjectileList);
    drawRectangleElement(upgradeList);
}