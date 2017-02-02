/* global playerSpeedVector */


    document.onkeydown = function (e) {
        if (
                e.keyCode === 37 ||
                e.keyCode === 38 ||
                e.keyCode === 39 ||
                e.keyCode === 40
                ) {
            event.preventDefault();
            processPlayerMotion(e.keyCode, "down");
        }else if(e.keyCode === 32){
            event.preventDefault();
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
        }else if(e.keyCode === 32){
            event.preventDefault();
            fireBomb();
        }
    };
