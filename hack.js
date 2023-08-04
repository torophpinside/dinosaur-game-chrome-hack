function checkForCollision(obstacle, tRex, opt_canvasCtx) {
    var incresedSpeed = Math.round(Runner.instance_.currentSpeed * 1.5);
    var baseWidhtAdd = 90 + incresedSpeed;
    if (Math.ceil(Runner.instance_.currentSpeed) < 8) {
        incresedSpeed = Math.round(Runner.instance_.currentSpeed * 1.2);
        baseWidhtAdd = 50 + incresedSpeed;
    }
    if (Math.ceil(Runner.instance_.currentSpeed) > 10) {
        incresedSpeed = Math.round(Runner.instance_.currentSpeed * 1.7);
        baseWidhtAdd = 120 + incresedSpeed;
    }

    Trex.collisionBoxesGhost = {
        DUCKING: [
            new CollisionBox(1, 18, 55 + baseWidhtAdd, 25)
        ],
        RUNNING: [
            new CollisionBox(22, 0, 17 + baseWidhtAdd, 16),
            new CollisionBox(1, 18, 30 + baseWidhtAdd, 9),
            new CollisionBox(10, 35, 14 + baseWidhtAdd, 8),
            new CollisionBox(1, 24, 29 + baseWidhtAdd, 5),
            new CollisionBox(5, 30, 21 + baseWidhtAdd, 4),
            new CollisionBox(9, 34, 15 + baseWidhtAdd, 4)
        ]
    };

    var tRexBox = new CollisionBox(
        tRex.xPos + 1,
        tRex.yPos + 1,
        tRex.config.WIDTH - 2,
        tRex.config.HEIGHT - 2);
    
    var tRexBoxPreCollision = new CollisionBox(
        tRex.xPos + 1,
        tRex.yPos + 1,
        tRex.config.WIDTH - 2 + (obstacle.typeConfig.width * obstacle.size) + baseWidhtAdd,
        tRex.config.HEIGHT - 2);

    var obstacleBox = new CollisionBox(
        obstacle.xPos + 1,
        obstacle.yPos + 1,
        obstacle.typeConfig.width * obstacle.size - 2,
        obstacle.typeConfig.height - 2);

    var _checkCollision = function (tRexBox, obstacleBox, isPreCollision) {
        if (boxCompare(tRexBox, obstacleBox)) {
            var collisionBoxes = obstacle.collisionBoxes;
            var tRexCollisionBoxes = tRex.ducking ? Trex.collisionBoxes.DUCKING : Trex.collisionBoxes.RUNNING;
            if (isPreCollision) {
                tRexCollisionBoxes = tRex.ducking ? Trex.collisionBoxesGhost.DUCKING : Trex.collisionBoxesGhost.RUNNING;
            }
            for (var t = 0; t < tRexCollisionBoxes.length; t++) {
                for (var i = 0; i < collisionBoxes.length; i++) {
                    var adjTrexBox = createAdjustedCollisionBox(tRexCollisionBoxes[t], tRexBox);
                    var adjObstacleBox = createAdjustedCollisionBox(collisionBoxes[i], obstacleBox);
                    var crashed = boxCompare(adjTrexBox, adjObstacleBox);
                    if (crashed) {
                        return [adjTrexBox, adjObstacleBox];
                    }
                }
            }
        }
        return false;
    };

    var checkCollision = _checkCollision(tRexBox, obstacleBox, false)
    if (!checkCollision) { 
        var checkPreCollision = _checkCollision(tRexBoxPreCollision, obstacleBox, true)
        if (checkPreCollision) {
            var evtd = new Event('keydown');
            evtd.which = evtd.keyCode = 32;
            window.document.dispatchEvent(evtd);
            return false;
        }
    }

    return checkCollision;
};
