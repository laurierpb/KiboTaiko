/* global enemyProjectileList, canvasHeight, upgradeValueList, enemyList */
var player = {
    x: 245,
    y: 490,
    larg: 18,
    haut: 30,
    color: "rgba(255, 255, 255, 1)",
    fireingIntervale: 0,
    upgrades: [0, 0, 0, 0, 0],
    image:"battleShip"
};
var playerNormalProjectile = {
    larg: 5,
    haut: 5,
    color: "rgba(255, 0, 0, 0.25)",
    velX: 0,
    velY: 15
};
playerNormalProjectileDefault = 5;

var playerMissileProjectile = {
    larg: 10,
    haut: 20,
    color: "rgba(255, 0, 0, 0.25)",
    velX: 0,
    velY: 0,
    target: null
};
var playerLazerProjectile = {
    larg: 10,
    haut: canvasHeight,
    color: "rgba(255, 0, 255, 0.25)",
    duration: 5
};
var maxY = 500 - player.haut;
var moveSpeed = 0;
var baseMoveSpeed = 10;
var playerSpeedVector = {x: 0, y: 0};
var playerMissileProjectileSpeed = 10;

var playerNormalProjectileList = [];
var playerMissileProjectileList = [];
var playerLazerProjectileList = [];

var baseFireingIntervale = 10;
var baseMultishotIntervale = 40;
var baseLazerIntervale = 50;
var baseMissileIntervale = 40;


function setPlayerPosition() {
    var normalisedSpeed = generateNormalisedSpeed(
            playerSpeedVector.x,
            playerSpeedVector.y,
            moveSpeed + player.upgrades[1] * upgradeValueList[1]);
    player.x += normalisedSpeed[0];
    player.y += normalisedSpeed[1];

    if (player.x > 490) {
        player.x = 490;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y > maxY) {
        player.y = maxY;
    }
    if (player.y < 0) {
        player.y = 0;
    }
}
function playerHit() {
    for (var i = 0; i < enemyProjectileList.length; i++) {
        if (isHit(player, enemyProjectileList[i])) {
            for (var j = 0; j < player.upgrades.length; j++) {
                player.upgrades[j] = 0;
            }
            break;
        }
    }
}
function setProjectilePosition() {
    for (var i = 0; i < playerNormalProjectileList.length; i++) {
        playerNormalProjectileList[i].y -= playerNormalProjectileList[i].velY;
        playerNormalProjectileList[i].x += playerNormalProjectileList[i].velX;
        if (playerNormalProjectileList[i].y < -10) {
            playerNormalProjectileList.splice(i, 1);
        }
    }
    for (var i = 0; i < playerMissileProjectileList.length; i++) {
        setMissileDirection(playerMissileProjectileList[i]);
        
        playerMissileProjectileList[i].y -= playerMissileProjectileList[i].velY;
        playerMissileProjectileList[i].x += playerMissileProjectileList[i].velX;
        
        if (playerMissileProjectileList[i].y < -10) {
            playerMissileProjectileList.splice(i, 1);
        }
    }
}
function setMissileDirection(missile){
    var target = missile.target;
    var x = target.x - missile.x;
    var y = missile.y - target.y;
    var normXY = (generateNormalisedSpeed(x, y, playerMissileProjectileSpeed));
    missile.velX = normXY[0];
    missile.velY = normXY[1];
}
function processPlayerMotion(key, event) {
    moveSpeed = baseMoveSpeed + upgradeValueList[1] * player.upgrades[1];

    if (playerSpeedVector.x > 0) {
        playerSpeedVector.x = moveSpeed;
    } else if (playerSpeedVector.x < 0) {
        playerSpeedVector.x = -moveSpeed;
    }
    if (playerSpeedVector.y > 0) {
        playerSpeedVector.y = moveSpeed;
    } else if (playerSpeedVector.y < 0) {
        playerSpeedVector.y = -moveSpeed;
    }

    if (event === 'down') {
        if (key === 37) {
            if (playerSpeedVector.x >= 0) {
                playerSpeedVector.x -= moveSpeed;
            }
        }
        if (key === 39) {
            if (playerSpeedVector.x <= 0) {
                playerSpeedVector.x += moveSpeed;
            }
        }
        if (key === 38) {
            if (playerSpeedVector.y >= 0) {
                playerSpeedVector.y -= moveSpeed;
            }
        }
        if (key === 40) {
            if (playerSpeedVector.y <= 0) {
                playerSpeedVector.y += moveSpeed;
            }
        }
    }
    if (event === "up") {
        if (key === 37) {
            if (playerSpeedVector.x <= 0) {
                playerSpeedVector.x += moveSpeed;
            }
        }
        if (key === 39) {
            if (playerSpeedVector.x >= 0) {
                playerSpeedVector.x -= moveSpeed;
            }
        }
        if (key === 38) {
            if (playerSpeedVector.y <= 0) {
                playerSpeedVector.y += moveSpeed;
            }
        }
        if (key === 40) {
            if (playerSpeedVector.y >= 0) {
                playerSpeedVector.y -= moveSpeed;
            }
        }
    }
}
function executePlayerAction() {
    var normalFireingInterval = (baseFireingIntervale - player.upgrades[2] * upgradeValueList[2]);
    if (player.fireingIntervale % normalFireingInterval === 0) {
        addNormalShotToList();
    }
    if (player.upgrades[3] > 0) {
        var multishotFireingIntervale = (baseMultishotIntervale - player.upgrades[3] * upgradeValueList[3]);
        if (player.fireingIntervale % multishotFireingIntervale === 0) {
            addMultishotToList();
        }
    }
    if (player.upgrades[4] > 0) {
        var missileFireingIntervale = (baseMultishotIntervale - player.upgrades[3] * upgradeValueList[3]);
        if (player.fireingIntervale % missileFireingIntervale === 0) {
            if (enemyList.length > 0) {
                addMissileShotToList();
            }
        }
    }
    if (player.fireingIntervale === 1000000) {
        player.fireingIntervale = 0;
    } else {
        player.fireingIntervale++;
    }
}

function addNormalShotToList() {
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - (playerNormalProjectile.larg + player.upgrades[0] * upgradeValueList[0]) / 2,
        y: player.y,
        larg: (playerNormalProjectile.larg) + upgradeValueList[0] * player.upgrades[0],
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX,
        velY: playerNormalProjectile.velY
    });
}
function addMultishotToList() {
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerNormalProjectile.larg,
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX + 3,
        velY: playerNormalProjectile.velY
    });
    playerNormalProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerNormalProjectile.larg,
        haut: playerNormalProjectile.haut,
        color: playerNormalProjectile.color,
        velX: playerNormalProjectile.velX - 3,
        velY: playerNormalProjectile.velY
    });
}
function addMissileShotToList() {
    playerMissileProjectileList.push({
        x: player.x + player.larg / 2 - playerNormalProjectile.larg / 2,
        y: player.y,
        larg: playerMissileProjectile.larg,
        haut: playerMissileProjectile.haut,
        color: playerMissileProjectile.color,
        velX: playerMissileProjectile.velX,
        velY: playerMissileProjectile.velY,
        target: enemyList[Math.floor(Math.random() * enemyList.length)]
    });
}