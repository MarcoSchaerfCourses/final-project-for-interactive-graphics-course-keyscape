//0,1,2  all
//3,4,5,6 torso
//7  collo
//13 right arm 
//14 right lower arm
//15 mano dx (polso)
//16,17,18 pollice dx, ecc... -> 28,29,30 mignolo dx
//32 left arm
//33 left lower arm
//34 mano sx (polso)
//35,36,37 pollice sx, ecc... -> 47,48,49 mignolo sx
//50 right leg
//51 right lower leg
//52 piede dx (caviglia), 53 avanpiede dx
//54 left leg
//55 left lower leg
//56 piede sx (caviglia), 57 avanpiede  sx

function moveCharacter(character, characterSkeleton, keys, move, base, moveP) {

    move.noAnim = true;

    if (character == null)
        return;

    if (keys.upPressed && !keys.shiftPressed) {

        walkanim(character, characterSkeleton, move, base);

        character.computeWorldMatrix();
        var WorldMatrix = character.getWorldMatrix(true);

        var localMoveVector = new BABYLON.Vector3(0, moveP.param, walkMove);
        moveVector = BABYLON.Vector3.TransformNormal(localMoveVector, WorldMatrix);
        character.moveWithCollisions(moveVector);
    }
    if (keys.upPressed && keys.shiftPressed) {

        runanim(character, characterSkeleton, move, base);

        character.computeWorldMatrix();
        var WorldMatrix = character.getWorldMatrix(true);

        var localMoveVector = new BABYLON.Vector3(0, moveP.param, runMove);
        moveVector = BABYLON.Vector3.TransformNormal(localMoveVector, WorldMatrix);
        character.moveWithCollisions(moveVector);
    }

}

function turnRigth(character, keys) {

    if (character == null)
        return;

    if (keys.rightPressed) {
        character.rotate(BABYLON.Axis.Y, rotationStep, BABYLON.Space.LOCAL);
        camera2.alpha = camera2.alpha - 0.022;
    }
}

function turnLeft(character, keys) {

    if (character == null)
        return;

    if (keys.leftPressed) {

        character.rotate(BABYLON.Axis.Y, -rotationStep, BABYLON.Space.LOCAL);
        camera2.alpha = camera2.alpha + 0.022;

    }
}

function walkanim(character, characterSkeleton, move, base) {

    if (move.phaseW == -1) {
        if (move.wasRunning) {
            character.position.y += 0.22;
        }
        //character.position.y = ground.position.y + 0.3;
        //character.position.y = -1.78;
        characterSkeleton.bones[3].setRotation(base.torsoInc, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[4].setRotation(base.torsoRot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[5].setRotation(base.petto, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].setRotation(base.neck, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].setRotation(base.rightUpperArm, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].setRotation(base.rightLowerArm, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[16].setRotation(base.polliceDX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[19].setRotation(base.indice1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[20].setRotation(base.indice2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[22].setRotation(base.medio1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[23].setRotation(base.medio2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[25].setRotation(base.anulare1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[26].setRotation(base.anulare2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[28].setRotation(base.mignolo1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[29].setRotation(base.mignolo2DX, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[32].setRotation(base.leftUpperArm, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].setRotation(base.leftLowerArm, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[35].setRotation(base.polliceSX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[38].setRotation(base.indice1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[39].setRotation(base.indice2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[41].setRotation(base.medio1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[42].setRotation(base.medio2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[44].setRotation(base.anulare1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[45].setRotation(base.anulare2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[47].setRotation(base.mignolo1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[48].setRotation(base.mignolo2SX, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[50].setRotation(base.rightUpperLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].setRotation(base.rightLowerLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].setRotation(base.leftUpperLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].setRotation(base.leftLowerLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].setRotation(base.rightFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].setRotation(base.rightFrontFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].setRotation(base.leftFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].setRotation(base.leftFrontFoot, BABYLON.Space.LOCAL, character);
        move.phaseR = -1;
        move.countR = 0;
        move.phaseW = 0;
        move.wasRunning = false;

    }

    if (move.countW <= 7 && move.phaseW == 0) {
        characterSkeleton.bones[3].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Y, -0.01, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL, character);
        //characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        //characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Y, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Y, 0.015, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 1;
            move.countW = 0;
        }
    }
    if (move.countW <= 7 && move.phaseW == 1) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, -0.075, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0.075, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 2;
            move.countW = 0;
        }
    }

    if (move.countW <= 7 && move.phaseW == 2) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, -0.075, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 3;
            move.countW = 0;
        }
    }

    if (move.countW <= 7 && move.phaseW == 3) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 4;
            move.countW = 0;
        }
    }

    if (move.countW <= 7 && move.phaseW == 4) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.075, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, 0.075, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 5;
            move.countW = 0;
        }
    }

    if (move.countW <= 7 && move.phaseW == 5) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, 0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, -0.075, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 6;
            move.countW = 0;
        }
    }
    if (move.countW <= 7 && move.phaseW == 6) {
        characterSkeleton.bones[4].rotate(BABYLON.Axis.X, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.045, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.09, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.015, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countW++;
        if (move.countW == 7) {
            move.phaseW = 1;
            move.countW = 0;
        }
    }
}

function runanim(character, characterSkeleton, move, base) {

    if (move.phaseR == -1) {
        //character.position.y = ground.position.y + 0.3;
        //character.position.y = -1.78;
        characterSkeleton.bones[3].setRotation(base.torsoInc, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[4].setRotation(base.torsoRot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[5].setRotation(base.petto, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].setRotation(base.neck, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].setRotation(base.rightUpperArm, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].setRotation(base.rightLowerArm, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[16].setRotation(base.polliceDX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[19].setRotation(base.indice1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[20].setRotation(base.indice2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[22].setRotation(base.medio1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[23].setRotation(base.medio2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[25].setRotation(base.anulare1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[26].setRotation(base.anulare2DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[28].setRotation(base.mignolo1DX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[29].setRotation(base.mignolo2DX, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[32].setRotation(base.leftUpperArm, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].setRotation(base.leftLowerArm, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[35].setRotation(base.polliceSX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[38].setRotation(base.indice1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[39].setRotation(base.indice2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[41].setRotation(base.medio1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[42].setRotation(base.medio2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[44].setRotation(base.anulare1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[45].setRotation(base.anulare2SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[47].setRotation(base.mignolo1SX, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[48].setRotation(base.mignolo2SX, BABYLON.Space.LOCAL, character);

        characterSkeleton.bones[50].setRotation(base.rightUpperLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].setRotation(base.rightLowerLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].setRotation(base.leftUpperLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].setRotation(base.leftLowerLeg, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].setRotation(base.rightFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].setRotation(base.rightFrontFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].setRotation(base.leftFoot, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].setRotation(base.leftFrontFoot, BABYLON.Space.LOCAL, character);
        move.wasRunning = true;
        character.position.y -= 0.22;
        move.phaseW = -1;
        move.countW = 0;
        move.phaseR = 0;

    }

    if (move.countR <= 5 && move.phaseR == 0) {
        //character.position.y -= 0.037;
        //character.position.y = -2;
        //manodx
        characterSkeleton.bones[16].rotate(BABYLON.Axis.Y, -0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[19].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[19].rotate(BABYLON.Axis.X, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[20].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[22].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[23].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[25].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[25].rotate(BABYLON.Axis.X, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[26].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[28].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[28].rotate(BABYLON.Axis.X, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[29].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        //manosx
        characterSkeleton.bones[35].rotate(BABYLON.Axis.Y, 0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[38].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[38].rotate(BABYLON.Axis.X, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[39].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[41].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[42].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[44].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[44].rotate(BABYLON.Axis.X, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[45].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[47].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[47].rotate(BABYLON.Axis.X, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[48].rotate(BABYLON.Axis.Z, 0.3, BABYLON.Space.LOCAL, character);
        //phase 0
        characterSkeleton.bones[3].rotate(BABYLON.Axis.Z, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[14].rotate(BABYLON.Axis.Z, -0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[33].rotate(BABYLON.Axis.Z, -0.3, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Y, -0.01, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.1, BABYLON.Space.LOCAL, character);
        //characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Y, -0.03, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Y, 0.03, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 1;
            move.countR = 0;
        }
    }
    if (move.countR <= 5 && move.phaseR == 1) {
        //character.position.y -= 0.0164;
        //character.position.y = -2.1;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL, character);
        //characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 2;
            move.countR = 0;
        }
    }

    if (move.countR <= 5 && move.phaseR == 2) {
        //character.position.y -= 0.02993;
        //character.position.y = -2.28;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 3;
            move.countR = 0;
        }
    }

    if (move.countR <= 5 && move.phaseR == 3) {
        //character.position.y += 0.046663;
        //character.position.y = -2;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, -0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, -0.26, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, -0.14, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.18, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 4;
            move.countR = 0;
        }
    }

    if (move.countR <= 5 && move.phaseR == 4) {
        //character.position.y -= 0.0164;
        //character.position.y = -2.1;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.2, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 5;
            move.countR = 0;
        }
    }

    if (move.countR <= 5 && move.phaseR == 5) {
        //character.position.y -= 0.02994;
        //character.position.y = -2.28;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.06, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, -0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 6;
            move.countR = 0;
        }
    }
    if (move.countR <= 5 && move.phaseR == 6) {
        //character.position.y += 0.04634;
        //character.position.y = -2;
        characterSkeleton.bones[5].rotate(BABYLON.Axis.X, 0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[7].rotate(BABYLON.Axis.X, -0.08, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[13].rotate(BABYLON.Axis.X, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.X, 0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Z, -0.14, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[51].rotate(BABYLON.Axis.Z, 0.18, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[52].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[53].rotate(BABYLON.Axis.Z, 0, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[55].rotate(BABYLON.Axis.Z, 0.16, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[56].rotate(BABYLON.Axis.Z, -0.26, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[57].rotate(BABYLON.Axis.Z, 0.16, BABYLON.Space.LOCAL, character);
        move.countR++;
        if (move.countR == 5) {
            move.phaseR = 1;
            move.countR = 0;
        }
    }

}