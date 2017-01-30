/* global app, upgradeSpawnIntervale, fireingIntervale */

/**
 * this is a game just for fun
 */
app.directive('myGame', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/GameDirective/Game.html',
        controller: function () {
            
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
            }, 42);
        }
    };
});