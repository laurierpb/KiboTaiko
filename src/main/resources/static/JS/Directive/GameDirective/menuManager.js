
/* global ctx */

/* global canvas, canvasWidth, canvasHeight, points */
var menuElement = [];
var optionValue = {
    difficulte: 1,
    nombreDeVie: 1,
    vitesse: 1,
    points: true
};
function setStartMenu() {
    clearCanvas();
    menuElement = [];
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.addEventListener("mousemove", onCanvasMove, false);
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvasWidth,
        haut: 0,
        font: "20px Arial",
        fillText: "difficulte: " + optionValue.difficulte +
                "  vie : " + optionValue.nombreDeVie +
                "  Vitesse : " + optionValue.vitesse +
                "  Afficher points : " + optionValue.points,
        utilisation: "display"
    });
    menuElement.push({
        x: 0,
        y: canvasHeight - 50,
        larg: canvasWidth,
        haut: 50,
        font: "60px Arial",
        fillText: "Start Game",
        utilisation: "startGame"
    });
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvas.width,
        haut: 50,
        font: "30px Arial",
        fillText: "Option",
        utilisation: "option"
    });
    if (points > 0 && optionValue.points) {
        menuElement.push({
            x: 0,
            y: canvasHeight - 150,
            larg: canvas.width,
            haut: 50,
            font: "30px Arial",
            fillText: "points : " + points,
            utilisation: ""
        });
    }
    drawMenu(menuElement);
}
function setOptionMenu() {
    menuElement = [];
    clearCanvas();
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.addEventListener("mousemove", onCanvasMove, false);
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvas.width,
        haut: 0,
        font: "20px Arial",
        fillText: "difficulte: " + optionValue.difficulte +
                "  vie : " + optionValue.nombreDeVie +
                "  Vitesse : " + optionValue.vitesse +
                "  Afficher points : " + optionValue.points,
        utilisation: "display"
    });
    menuElement.push({
        x: 0,
        y: 30,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Vitesse +",
        utilisation: "vitesse +"
    });
    menuElement.push({
        x: canvas.width / 2,
        y: 30,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Vitesse -",
        utilisation: "vitesse -"
    });


    menuElement.push({
        x: (canvas.width / 3) * 0,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Facile 1",
        utilisation: "facile"
    });
    menuElement.push({
        x: (canvas.width / 3) * 1,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Moyen 2",
        utilisation: "moyen"
    });
    menuElement.push({
        x: (canvas.width / 3) * 2,
        y: 80,
        larg: canvas.width / 3,
        haut: 50,
        font: "30px Arial",
        fillText: "Difficile 3",
        utilisation: "difficile"
    });
    menuElement.push({
        x: 0,
        y: 130,
        larg: canvas.width,
        haut: 50,
        font: "30px Arial",
        fillText: "Afficher points",
        utilisation: "points"
    });
    menuElement.push({
        x: 0,
        y: 180,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Ajouter une vie",
        utilisation: "vie+"
    });
    menuElement.push({
        x: canvas.width / 2,
        y: 180,
        larg: canvas.width / 2,
        haut: 50,
        font: "30px Arial",
        fillText: "Enlever une vie",
        utilisation: "vie-"
    });

    menuElement.push({
        x: 0,
        y: canvasHeight - 160,
        larg: canvasWidth,
        haut: 80,
        font: "60px Arial",
        fillText: "Test",
        utilisation: "test"
    });
    menuElement.push({
        x: 0,
        y: canvasHeight - 80,
        larg: canvasWidth,
        haut: 80,
        font: "60px Arial",
        fillText: "Main Menu",
        utilisation: "mainMenu"
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
            switch (menuElement[i].utilisation) {
                case "startGame":
                    this.style.cursor = 'initial';
                    removeButtonFromMenu();
                    startGame(optionValue);
                    break;
                case "option":
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vitesse +":
                    optionValue.vitesse += 0.1;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vitesse -":
                    if (optionValue.vitesse <= 0.1) {
                        break
                    } else{
                        optionValue.vitesse -= 0.1;
                    }
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "facile":
                    optionValue.difficulte = 1;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "moyen":
                    optionValue.difficulte = 2;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "difficile":
                    optionValue.difficulte = 3;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "test":
                    optionValue.difficulte = 0;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "mainMenu":
                    removeButtonFromMenu();
                    setStartMenu();
                    break;
                case "points":
                    optionValue.points = true;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vie+":
                    optionValue.nombreDeVie++;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
                case "vie-":
                    optionValue.nombreDeVie--;
                    removeButtonFromMenu();
                    setOptionMenu();
                    break;
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


function removeButtonFromMenu() {
    canvas.removeEventListener("click", onCanvasClick, false);
    canvas.removeEventListener("mousemove", onCanvasMove, false);
}