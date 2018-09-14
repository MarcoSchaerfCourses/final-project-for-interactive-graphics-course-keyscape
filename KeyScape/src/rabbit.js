function animateRabbit(rabbit, rabbitSkel, moveRabbit) {

    if (moveRabbit.phaseRabb == 0 && moveRabbit.countRabb <= 9) {
        rabbitSkel.bones[2].rotate(BABYLON.Axis.Y, -0.03, BABYLON.Space.LOCAL, rabbit);
        rabbitSkel.bones[3].rotate(BABYLON.Axis.Y, -0.03, BABYLON.Space.LOCAL, rabbit);
        rabbit.position.y += 0.1;
        rabbit.position.z -= 0.2;
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            moveRabbit.countRabb = 0;
            moveRabbit.phaseRabb = 1;
            moveRabbit.changeDirR++;
        }
    }
    if (moveRabbit.phaseRabb == 1 && moveRabbit.countRabb <= 9) {
        rabbitSkel.bones[2].rotate(BABYLON.Axis.Y, 0.03, BABYLON.Space.LOCAL, rabbit);
        rabbitSkel.bones[3].rotate(BABYLON.Axis.Y, 0.03, BABYLON.Space.LOCAL, rabbit);
        rabbit.position.y -= 0.1;
        rabbit.position.z -= 0.2;
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            if (moveRabbit.changeDirR == 35) {
                moveRabbit.phaseRabb = 2;
                moveRabbit.countRabb = 0;
                moveRabbit.changeDirR = 0;
            } else {
                moveRabbit.countRabb = 0;
                moveRabbit.phaseRabb = 0;
                moveRabbit.changeDirR++;
            }
        }
    }
    if (moveRabbit.phaseRabb == 2 && moveRabbit.countRabb <= 9) {
        rabbit.rotate(BABYLON.Axis.Y, 0.35, BABYLON.Space.LOCAL);
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            moveRabbit.countRabb = 0;
            moveRabbit.phaseRabb = 3;
        }
    }
    if (moveRabbit.phaseRabb == 3 && moveRabbit.countRabb <= 9) {
        rabbitSkel.bones[2].rotate(BABYLON.Axis.Y, -0.03, BABYLON.Space.LOCAL, rabbit);
        rabbitSkel.bones[3].rotate(BABYLON.Axis.Y, -0.03, BABYLON.Space.LOCAL, rabbit);
        rabbit.position.y += 0.1;
        rabbit.position.z += 0.2;
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            moveRabbit.countRabb = 0;
            moveRabbit.phaseRabb = 4;
            moveRabbit.changeDirR++;
        }
    }
    if (moveRabbit.phaseRabb == 4 && moveRabbit.countRabb <= 9) {
        rabbitSkel.bones[2].rotate(BABYLON.Axis.Y, 0.03, BABYLON.Space.LOCAL, rabbit);
        rabbitSkel.bones[3].rotate(BABYLON.Axis.Y, 0.03, BABYLON.Space.LOCAL, rabbit);
        rabbit.position.y -= 0.1;
        rabbit.position.z += 0.2;
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            if (moveRabbit.changeDirR == 35) {
                moveRabbit.phaseRabb = 5;
                moveRabbit.countRabb = 0;
                moveRabbit.changeDirR = 0;
            } else {
                moveRabbit.countRabb = 0;
                moveRabbit.phaseRabb = 3;
                moveRabbit.changeDirR++;
            }
        }
    }
    if (moveRabbit.phaseRabb == 5 && moveRabbit.countRabb <= 9) {
        rabbit.rotate(BABYLON.Axis.Y, 0.35, BABYLON.Space.LOCAL);
        moveRabbit.countRabb++;
        if (moveRabbit.countRabb == 9) {
            moveRabbit.countRabb = 0;
            moveRabbit.phaseRabb = 0;
        }
    }
}