/* global playerNormalProjectileList, player, playerMissileProjectileList */

var enemyList = [];
var enemyProjectileList = [];
var enemyStartingYPosition = 0;
var enemy = {
    larg: 20,
    haut: 10,
    color: "rgba(255, 255, 0, 1)",
    direction: 1,
    fireIntervale: 0
};
var enemyProjectile = {
    larg: 5,
    haut: 5,
    color: "rgba(255, 255, 0, 1)",
    moveX: 0,
    moveY: 0
};
var enemyMoveVectorHorizontal = 3;
var enemyVerticalMovement = 20;
var enemySpawnIntervale = 0;
var enemyBaseSpawnIntervale = 20;
var enemeyProjSpeed = 10;
var enemyFireRate = [20, 30];
var enemyAimOffset = 60;
function setEnemyPosition() {
    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].x += enemyMoveVectorHorizontal * enemyList[i].direction;
        if (enemyList[i].x > 480) {
            enemyList[i].x = 480;
            enemyList[i].y += enemyVerticalMovement;
            enemyList[i].direction = enemyList[i].direction * -1;
        }
        if (enemyList[i].x < 0) {
            enemyList[i].x = 0;
            enemyList[i].y += enemyVerticalMovement;
            enemyList[i].direction = enemyList[i].direction * -1;
        }
        if (enemyList[i].y > 480) {
            enemyList.splice(i, 1);
        }
        for (var j = 0; j < playerNormalProjectileList.length; j++) {
            if (isHit(enemyList[i], playerNormalProjectileList[j])) {
                enemyList.splice(i, 1);
                playerNormalProjectileList.splice(i, 1);
                break;
            }
        }
        for (var j = 0; j < playerMissileProjectileList.length; j++) {
            if (isHit(enemyList[i], playerMissileProjectileList[j])) {
                enemyList.splice(i, 1);
                playerMissileProjectileList.splice(j, 1);
                break;
            }
        }
    }
}
function addEnemyToList() {
    if (enemySpawnIntervale <= 0) {
        var randomXValue;
        do {
            randomXValue = Math.random() * (480 - 0) + 0;
        } while (canEnemyNotSpawn(randomXValue));

        enemyList.push({
            x: randomXValue,
            y: enemyStartingYPosition,
            larg: enemy.larg,
            haut: enemy.haut,
            color: enemy.color,
            direction: enemy.direction,
            fireIntervale: Math.random() * (enemyFireRate[0] - enemyFireRate[1]) + enemyFireRate[0]
        });
        enemySpawnIntervale = enemyBaseSpawnIntervale;
    }
    enemySpawnIntervale -= 1;
}
function canEnemyNotSpawn(xValue) {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].y === 0 && enemyList[i].x < xValue && enemyList[i].x + enemyList[i].larg > xValue) {
            return true;
        }
    }
    return false;
}

function enemiesFire() {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].fireIntervale <= 0) {
            addEnemyProjToList(enemyList[i]);
            enemyList[i].fireIntervale = Math.random() * (enemyFireRate[0] - enemyFireRate[1]) + enemyFireRate[0];
        } else {
            enemyList[i].fireIntervale -= 1;
        }
    }
}

function addEnemyProjToList(enemy) {
    var playerX = player.x - player.larg / 2;
    var playerY = player.y - player.larg / 2;
    var projX = enemy.x;
    var projY = enemy.y;

    var x = playerX - projX;
    var y = playerY - projY;
    x = Math.random() * ((x + enemyAimOffset) - (x - enemyAimOffset)) + (x - enemyAimOffset);
    var z = Math.sqrt(x * x + y * y) / enemeyProjSpeed;

    enemyProjectileList.push({
        x: enemy.x + enemy.larg / 2,
        y: enemy.y + enemy.haut,
        larg: enemyProjectile.larg,
        haut: enemyProjectile.haut,
        color: "rgba(255, 255, 0, 1)",
        moveX: x / z,
        moveY: y / z
    });
}
function setEnemiesFirePosition() {
    for (var i = 0; i < enemyProjectileList.length; i++) {
        if (enemyProjectileList[i].y > 500 ||
                enemyProjectileList[i].x < 0 ||
                enemyProjectileList[i].x > 500) {
            enemyProjectileList.splice(i, 1);
        } else {
            enemyProjectileList[i].x += enemyProjectileList[i].moveX;
            enemyProjectileList[i].y += enemyProjectileList[i].moveY;
        }
    }
    playerHit();
}