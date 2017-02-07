/* global points, enemyList, upgradeList, playerMissileProjectileList, playerNormalProjectileList, vie, player, enemyProjectileList, gameExecution, bombLeft, progressiveDifficulty, bossIsSpawn, bossSpawnPoint, enemyUpgrade */

var projHitOffsetY = 10;

function isHit(target, proj) {
    if (target === undefined || proj === undefined) {
        return;
    }
    if (
            target.x + target.larg < proj.x ||
            target.y + target.haut < proj.y ||
            proj.x + proj.larg < target.x ||
            proj.y + proj.haut < target.y
            ) {
        return false;
    } else {
        return true;
    }
}

function generateNormalisedSpeed(x, y, speed) {
    if (x === 0 || y === 0) {
        return [x, y];
    } else {
        var vector = Math.sqrt(x * x + y * y);
        var offset = vector / speed;
        return [x / offset, y / offset];
    }
}
function getAngleFromTriangle(larg, haut) {
    var tan = Math.abs((haut) / (larg));
    return Math.atan(tan) * 180 / Math.PI;
}
function generatePointsForTrianglePointing(missile, enemy) {
    var largeurEchaile = missile.x - enemy.x;
    var hauteurEchaile = missile.y - enemy.y;
    var hipoEchaile = Math.sqrt(largeurEchaile * largeurEchaile + hauteurEchaile * hauteurEchaile);

    var echaile = (missile.haut / 2) / hipoEchaile;

    var xPremierTriangle = echaile * largeurEchaile;
    var yPremierTriangle = echaile * hauteurEchaile;

    var coordHautMissile = [
        missile.x - xPremierTriangle,
        missile.y - yPremierTriangle
    ];

    var coordBasMissile = [
        missile.x + xPremierTriangle,
        missile.y + yPremierTriangle
    ];
    var coordBasGaucheMissile = [
        coordBasMissile[0] + (missile.larg / 2) * (hauteurEchaile / hipoEchaile) * (-1),
        coordBasMissile[1] + (missile.larg / 2) * (largeurEchaile / hipoEchaile)
    ];
    var coordBasDroitMissile = [
        coordBasMissile[0] - (missile.larg / 2) * (hauteurEchaile / hipoEchaile) * (-1),
        coordBasMissile[1] - (missile.larg / 2) * (largeurEchaile / hipoEchaile)
    ];
    return [coordHautMissile, coordBasGaucheMissile, coordBasDroitMissile];
}
function addPoints(point) {
    if (points % enemyUpgrade + point >= enemyUpgrade) {
        bombLeft++;
        if (progressiveDifficulty) {
            upgradeDifficultyProg();
        }
    }
    if (points % bossSpawnPoint + point >= bossSpawnPoint) {
        if (!bossIsSpawn) {
            spawnBoss();
        }
    }
    points += point;
}
function playerLostLife() {
    vie--;
    enemyList = [];
    upgradeList = [];
    playerMissileProjectileList = [];
    playerNormalProjectileList = [];
    enemyProjectileList = [];
    bossProjectileList = [];
    bossProjectileWallList = [];
    for (var i = 0; i < player.upgrades.length; i++) {
        player.upgrades[i] = 0;
    }
}
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}