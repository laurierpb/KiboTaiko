
/* global ctx */

/* global canvas */

var menuElement = [];
var optionValue = {
    difficulte: 1,
    nombreDeVie: 1,
    vitesse:1,
    points: false
};
function setStartMenu() {
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.addEventListener("mousemove", onCanvasMove, false);
    menuElement.push({
        x: 0,
        y: 0,
        larg: canvas.width,
        haut: 80,
        font: "30px Arial",
        fillText: "Start Game",
        utilisation: "startGame"
    });
    menuElement.push({
        x: 0,
        y: 100,
        larg: canvas.width,
        haut: 80,
        font: "30px Arial",
        fillText: "Option",
        utilisation: "option"
    });
    drawMenu(menuElement);
}
function onCanvasMove(e) {
    this.style.cursor = 'initial';
    for (var i = 0; i < menuElement.length; i++) {
        if (isCursorOnElement(menuElement[i], e)) {
            this.style.cursor = 'pointer';
            return;
        }
    }
}
function onCanvasClick(e) {
    for (var i = 0; i < menuElement.length; i++) {
        if (isCursorOnElement(menuElement[i], e)) {
            if (menuElement[i].utilisation === "startGame") {
                this.style.cursor = 'initial';
                startGame();
            }
        }
    }
}
function isCursorOnElement(element, e) {
    var position = getCursorPosition(e);
    var x = position[0];
    var y = position[1];
    return (element !== undefined &&
            x > element.x &&
            x < (element.x + element.larg) &&
            y > element.y &&
            y < (element.y + element.haut));
}
function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX !== undefined && e.pageY !== undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
    }
    if (canvas.offsetTop > 0) {
        y -= canvas.offsetTop;
    } else {
        y -= canvas.offsetParent.offsetTop;
    }
    if (canvas.offsetParent.offsetLeft === 0) {
        x -= canvas.offsetLeft;
    } else {
        x -= canvas.offsetParent.offsetLeft + canvas.offsetLeft;
    }
    return [x, y];
}
