/* global fps, vitesse, vie, isBombFired */
var points = 0;
var interval = null;
function startGame(startGameValue) {
    setOptions(startGameValue);
    interval = setInterval(gameExecution, fps / vitesse);
}

var gameExecution = function () {
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
    if(isBombFired){
        executeBombAction();
    }
    if (vie === 0) {
        setStartMenu();
        clearInterval(interval);
    }
};