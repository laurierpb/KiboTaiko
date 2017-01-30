/* global player, playerNormalProjectile, upgradeBaseSpawnIntervale */

/*
 * 1 = larger projectile
 */
var upgrade = {
    x: 0,
    y: 0,
    larg: 30,
    haut: 30,
    color: "rgba(0, 0, 255, 1)",
    upgrade: 0
};

var upgradeValueList = [5, 2, 1, 5, 5];
var upgradeMaxValueList = [20, 5, 9, 6, 5];


var upgradeList = [];
var upgradeDropSpeed = 4;
var upgradeSpawnIntervale = 0;
var upgradeBaseSpawnIntervale = 48;

function setUpgradePosition() {
    if (upgradeSpawnIntervale <= 0) {
        var min = Math.ceil(0);
        var max = Math.floor(5);
        upgradeList.push({
            x: (Math.random() * (470 - 0) + 0),
            y: upgrade.y,
            larg: upgrade.larg,
            haut: upgrade.haut,
            color: upgrade.color,
            upgrade: Math.floor(Math.random() * ((max + 1) - min) + min),
            upgradeValue: upgrade.upgradeValue
        });
        upgradeSpawnIntervale = upgradeBaseSpawnIntervale;
    }
    for (var i = 0; i < upgradeList.length; i++) {
        if (upgradeList[i].y > 500) {
            upgradeList.splice(i, 1);
        } else if (isHit(player, upgradeList[i])) {
            addUpgradeToPlayer(upgradeList[i]);
            upgradeList.splice(i, 1);
        } else {
            upgradeList[i].y += upgradeDropSpeed;
        }
    }
    upgradeSpawnIntervale--;
}

function addUpgradeToPlayer(upgrade) {
    switch (upgrade.upgrade) {
        case 0:
            if (player.upgrades[0] < upgradeMaxValueList[0]) {
                player.upgrades[0]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 1:
            if (player.upgrades[1] < upgradeMaxValueList[1]) {
                player.upgrades[1]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 2:
            if (player.upgrades[2] < upgradeMaxValueList[2]) {
                player.upgrades[2]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 3:
            if (player.upgrades[3] < upgradeMaxValueList[3]) {
                player.upgrades[3]++;
            } else {
                upgrade.upgrade++;
                addUpgradeToPlayer(upgrade);
            }
            break;
        case 4:
            player.upgrades[4]++;
            break;
    }
}