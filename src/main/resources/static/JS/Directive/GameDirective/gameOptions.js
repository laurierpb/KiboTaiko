/* global onCanvasClick, onCanvasMove, player, enemy, canvasWidth, canvasHeight */
var fps = 48;
var vitesse = 1;
var showPoints = false;
var difficulte = 1;
var vie = 1;

function setOptions(startGameValue) {
    vitesse = startGameValue.vitesse;
    showPoints = startGameValue.points;
    difficulte = startGameValue.difficulte;
    vie = startGameValue.nombreDeVie;
    
    generateDefaultValue();
    console.log("test");
    processOptions();
}
function processOptions() {
    if (difficulte === 0) {
        enemyAimOffset = 80;
        enemyFireRate = [100000, 100000];
        enemyBaseSpawnIntervale = 24;
        upgradeDropSpeed = 3;
        upgradeBaseSpawnIntervale = 24000;
        player.upgrades[4] = 1;
        baseMissileIntervale = 3;
        baseFireingIntervale = 1000000;
        enemyBaseSpawnIntervale = 10;
        enemy.hp = 5;
    } else if (difficulte === 1) {
        enemyAimOffset = 80;
        enemyFireRate = [20, 40];
        enemyBaseSpawnIntervale = 24;
        upgradeDropSpeed = 3;
        upgradeBaseSpawnIntervale = 24;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    } else if (difficulte === 2) {
        enemyAimOffset = 30;
        enemyFireRate = [20, 40];
        enemyBaseSpawnIntervale = 32;
        upgradeDropSpeed = 4;
        upgradeBaseSpawnIntervale = 32;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    } else if (difficulte === 3) {
        enemyAimOffset = 20;
        enemyFireRate = [15, 30];
        enemyBaseSpawnIntervale = 12;
        upgradeDropSpeed = 4;
        upgradeBaseSpawnIntervale = 42;
        enemy.hp = 2;
        for (var i = 0; i < player.upgrades.length; i++) {
            player.upgrades[i] = 0;
        }
    }
}
function generateDefaultValue(){
    player.x = canvasWidth / 2 + player.larg / 2;
    player.y = canvasHeight - player.haut;
    points = 0;
    enemy.hp = 1;
    bombLeft = 0;
}