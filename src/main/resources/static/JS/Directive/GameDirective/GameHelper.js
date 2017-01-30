var projHitOffsetY = 10;
function isHit(target, proj) {
    if(target === undefined || proj === undefined){
        return;
    }
    return (target.x < proj.x && target.x + target.larg > proj.x &&
            target.y < proj.y && target.y + target.haut + projHitOffsetY > proj.y) ||
            (target.x > proj.x && target.x < proj.x + proj.larg &&
                    target.y > proj.y && target.y < proj.y + proj.haut + projHitOffsetY);
}

function generateNormalisedSpeed(x, y, speed){
    if(x === 0 || y === 0){
        return [x, y];
    }else{
        var vector = Math.sqrt(x*x + y*y);
        var offset = vector / speed;
        return [x/offset, y/offset];
    }
}
function getAngleFromTriangle(larg, haut){
    var tan = Math.abs((haut) / (larg));
    return Math.atan(tan)*180/Math.PI;
}