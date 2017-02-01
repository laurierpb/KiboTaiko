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
function drawCircleElement(elements) {
    for (var i = 0; i < elements.length; i++) {
        ctx.beginPath();
        ctx.arc(elements[i].x, elements[i].y, elements[i].larg, 0, 2 * Math.PI);

        // the fill color
        ctx.fillStyle = elements[i].color;
        ctx.fill();
    }
}
function drawImageToCanvas(elements) {
    for (var i = 0; i < elements.length; i++) {
        var img = document.getElementById(elements[i].image);
        ctx.drawImage(img, elements[i].x, elements[i].y, elements[i].larg, elements[i].haut);
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCanvas() {
    drawImageToCanvas([player]);
    drawCircleElement(playerNormalProjectileList);
    drawTriangleElement(playerMissileProjectileList);
    drawImageToCanvas(enemyList);
    drawRectangleElement(enemyProjectileList);
    drawImageToCanvas(upgradeList);
}