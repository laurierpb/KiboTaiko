/* global onCanvasClick, onCanvasMove */
var fps = 42;
var vitesse = 0.5;
var points = 0;
var life = 1;
function startGame(){
    document.getElementById("gameCanvas").removeEventListener("click", onCanvasClick);
    document.getElementById("gameCanvas").removeEventListener("mousemove", onCanvasMove);
    window.setInterval(function () {
        //handelPlayerInput();
        setPlayerPosition();
        executePlayerAction();
        setProjectilePosition();

        setEnemyPosition();
        enemiesFire();
        setEnemiesFirePosition();

        setUpgradePosition();

        addEnemyToList();

        clearCanvas();
        drawCanvas();
    }, fps / vitesse);
}
