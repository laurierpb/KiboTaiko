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
        var coord = generatePointsForTrianglePointing(elements[i], elements[i].target);
        ctx.beginPath();
        ctx.moveTo(
                coord[0][0],
                coord[0][1]
                );
        ctx.lineTo(
                coord[1][0],
                coord[1][1]
                );
        ctx.lineTo(
                coord[2][0],
                coord[2][1]
                );
        ctx.closePath();
        // the outline

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
function drawArc(element) {
    ctx.beginPath();
    ctx.arc(
            player.x + player.larg / 2,
            player.y + player.larg / 2 + 5,
            35,
            Math.PI * 1.15,
            Math.PI * (1.85)
            );
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0, 255, 255, " + element + ")";
    ctx.stroke();
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawMenu(elements) {
    for (var i = 0; i < elements.length; i++) {
        ctx.font = elements[i].font;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(elements[i].fillText, canvas.width / 2, elements[i].y + 50);
    }
}
function drawCanvas() {
    drawImageToCanvas([player]);
    drawCircleElement(playerNormalProjectileList);
    drawTriangleElement(playerMissileProjectileList);
    drawImageToCanvas(enemyList);
    drawRectangleElement(enemyProjectileList);
    drawImageToCanvas(upgradeList);
    drawArc(player.upgrades[5] / 10);
}