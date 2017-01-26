/* global app */

/**
 * this is a game just for fun
 */
app.directive('myGame', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/GameDirective/Game.html',
        controller: function () {
            var canvas = document.getElementById('gameCanvas');
            canvas.width = 500;
            canvas.height = 500;
            var ctx = canvas.getContext("2d");
            var moveSpeed = 10;
            var projHitOffsetY = 10;
            var playerSpeedVector = {
                x: 0,
                y: 0
            };
            var player = {
                x: 245,
                y: 490,
                larg: 10,
                haut: 10,
                color: "rgba(255, 255, 255, 1)"
            };
            var playerProjectile = {
                x: 0,
                y: 0,
                larg: 5,
                haut: 5,
                color: "rgba(255, 0, 0, 0.25)"
            };
            var playerProjectileSpeedVector = {
                x: 0,
                y: 10
            };
            var playerProjectileList = [];
            var fireingIntervale = 0;
            var isFireing = 0;
            var baseFireingIntervale = 10;
            var enemyList = [];
            var enemyProjectileList = [];
            var enemy = {
                x: 0,
                y: 0,
                larg: 20,
                haut: 10,
                color: "rgba(255, 255, 0, 1)",
                direction: 1,
                fireIntervale: 0
            };
            var enemyProjectile = {
                x: 0,
                y: 0,
                larg: 5,
                haut: 5,
                color: "rgba(255, 255, 0, 1)",
                moveX: 0,
                moveY: 0
            };
            var enemyMoveVectorHorizontal = 3;
            var enemyVerticalMovement = 20;
            var enemySpawnIntervale = 0;
            var enemyBaseSpawnIntervale = 40;
            var enemeyProjSpeed = 10;
            var enemyFireRate = [30, 50];
            var enemyAimOffset = 60;

            /*
             * 1 = larger projectile
             */
            var upgrade = {
                x: 0,
                y: 0,
                larg: 30,
                haut: 30,
                color: "rgba(0, 0, 255, 1)",
                upgrade: 1
            };
            var upgradeToAdd = [];
            var upgradeDropSpeed = 4;
            var upgradeSpawnIntervale = 0;
            var upgradeBaseSpawnIntervale = 50;



            document.onkeydown = function (e) {
                if (
                        e.keyCode === 37 ||
                        e.keyCode === 38 ||
                        e.keyCode === 39 ||
                        e.keyCode === 40
                        ) {
                    event.preventDefault();
                    processPlayerMotion(e.keyCode, "down");
                }
                if (e.keyCode === 32) {
                    event.preventDefault();
                    processPlayerAction('Fire', 'down');
                }
            };
            document.onkeyup = function (e) {
                if (
                        e.keyCode === 37 ||
                        e.keyCode === 38 ||
                        e.keyCode === 39 ||
                        e.keyCode === 40
                        ) {
                    event.preventDefault();
                    processPlayerMotion(e.keyCode, "up");
                }
                if (e.keyCode === 32) {
                    event.preventDefault();
                    processPlayerAction('Fire', 'up');
                }
            };
            function drawElement(element) {
                for (var i = 0; i < element.length; i++) {
                    ctx.fillStyle = element[i].color;
                    ctx.fillRect(
                            element[i].x,
                            element[i].y,
                            element[i].larg,
                            element[i].haut);
                }

            }
            function processPlayerMotion(key, event) {
                if (event === 'down') {
                    if (key === 37) {
                        if (playerSpeedVector.x > -moveSpeed) {
                            playerSpeedVector.x -= moveSpeed;
                        }
                    }
                    if (key === 39) {
                        if (playerSpeedVector.x < moveSpeed) {
                            playerSpeedVector.x += moveSpeed;
                        }
                    }
                    if (key === 38) {
                        if (playerSpeedVector.y > -moveSpeed) {
                            playerSpeedVector.y -= moveSpeed;
                        }
                    }
                    if (key === 40) {
                        if (playerSpeedVector.y < moveSpeed) {
                            playerSpeedVector.y += moveSpeed;
                        }
                    }
                } else if (event === "up") {
                    if (key === 37) {
                        playerSpeedVector.x += moveSpeed;
                    }
                    if (key === 39) {
                        playerSpeedVector.x -= moveSpeed;
                    }
                    if (key === 38) {
                        playerSpeedVector.y += moveSpeed;
                    }
                    if (key === 40) {
                        playerSpeedVector.y -= moveSpeed;
                    }
                }

            }

            function clearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            function drawCanvas() {
                drawElement([player]);
                drawElement(playerProjectileList);
                drawElement(enemyList);
                drawElement(enemyProjectileList);
                drawElement(upgradeToAdd);
            }
            function setPlayerPosition() {
                player.x += playerSpeedVector.x;
                player.y += playerSpeedVector.y;
                if (player.x > 490) {
                    player.x = 490;
                }
                if (player.x < 0) {
                    player.x = 0;
                }
                if (player.y > 490) {
                    player.y = 490;
                }
                if (player.y < 0) {
                    player.y = 0;
                }
            }
            function processPlayerAction(action, event) {
                if (action === 'Fire' && event === 'down') {
                    isFireing = 1;
                }
                if (action === 'Fire' && event === 'up') {
                    isFireing = 0;
                }
            }
            function setProjectilePosition() {
                for (var i = 0; i < playerProjectileList.length; i++) {
                    playerProjectileList[i].y -= playerProjectileSpeedVector.y;
                    if (playerProjectileList[i].y < -10) {
                        playerProjectileList.splice(i, 1);
                    }
                }
            }
            function executePlayerAction() {
                if (isFireing === 1 && fireingIntervale <= 0) {
                    playerProjectileList.push({
                        x: player.x + player.larg / 2,
                        y: player.y - 15,
                        larg: playerProjectile.larg,
                        haut: playerProjectile.haut,
                        color: playerProjectile.color
                    });
                    fireingIntervale = baseFireingIntervale;
                }
            }
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
                    for (var j = 0; j < playerProjectileList.length; j++) {
                        if (isHit(enemyList[i], playerProjectileList[j])) {
                            enemyList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            function isHit(target, proj) {
                return (target.x < proj.x && target.x + target.larg > proj.x &&
                        target.y < proj.y && target.y + target.haut + projHitOffsetY > proj.y) ||
                       (target.x > proj.x && target.x < proj.x + proj.larg &&
                       target.y > proj.y && target.y < proj.y + proj.haut + projHitOffsetY);
            }
            function addEnemyToList() {
                if (enemySpawnIntervale <= 0) {
                    var randomXValue;
                    do {
                        randomXValue = Math.random() * (480 - 0) + 0;
                    } while (canEnemyNotSpawn(randomXValue));

                    enemyList.push({
                        x: randomXValue,
                        y: enemy.y,
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
            }
            function playerHit() {
                for (var i = 0; i < enemyProjectileList.length; i++) {
                    if (isHit(player, enemyProjectileList[i])) {
                        playerProjectile.larg = 5;
                    }
                }
            }
            function addUpgradeToPlayer(upgrade){
                if(upgrade.upgrade === 1){
                    playerProjectile.haut = 5;
                    playerProjectile.larg += 5;
                }
            }
            function setUpgradePosition() {
                if (upgradeSpawnIntervale <= 0) {
                    upgradeToAdd.push({
                        x: (Math.random() * (470 - 0) + 0),
                        y: upgrade.y,
                        larg: upgrade.larg,
                        haut: upgrade.haut,
                        color: upgrade.color,
                        upgrade: (Math.random() * (1 - 1) + 1)
                    });
                    upgradeSpawnIntervale = upgradeBaseSpawnIntervale;
                }
                for (var i = 0; i < upgradeToAdd.length; i++) {
                    if (upgradeToAdd[i].y > 500) {
                        upgradeToAdd.splice(i, 1);
                    }else if(isHit(player, upgradeToAdd[i])){
                        addUpgradeToPlayer(upgradeToAdd[i]);
                        upgradeToAdd.splice(i, 1);
                    } else {
                        upgradeToAdd[i].y += upgradeDropSpeed;
                    }
                }
            }
            window.setInterval(function () {
                setPlayerPosition();
                setProjectilePosition();
                setEnemyPosition();
                executePlayerAction();
                enemiesFire();
                setEnemiesFirePosition();
                setUpgradePosition();
                playerHit();


                addEnemyToList();
                fireingIntervale--;
                upgradeSpawnIntervale--;

                clearCanvas();
                drawCanvas();
            }, 42);
        }
    };
});