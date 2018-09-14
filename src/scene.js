var canvas = document.getElementById("myCanvas");

var engine = new BABYLON.Engine(canvas, true);

BABYLON.SceneLoader.CleanBoneMatrixWeights = true;

var night = false;
var difficulty = 0;

var keys = {
    "upPressed": false,
    "rightPressed": false,
    "leftPressed": false,
    "shiftPressed": false
};

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var shiftPressed = false;
var spacePressed = false;

var key;

var camera2;
var alpha = 0;

var character;
var characterSkeleton = null;
var characterVec = [];

var moveVector = new BABYLON.Vector3(0, 0, 0);
var walkMove = 4;
var runMove = 10;
var rotationStep = 0.022;

var localMoveVector = [];
var moveVector = [];

var rabbit = [];
var rabbitSkel = [];
var numrabbit;
var BASE_NUM_RABBIT = 4;
var posR1 = new BABYLON.Vector3(300, 1.8, 810);
var posR2 = new BABYLON.Vector3(930, 1.8, 1040);
var posR3 = new BABYLON.Vector3(50, 2, 2170);
var posR4 = new BABYLON.Vector3(2000, 1.8, 1320);
var posR5 = new BABYLON.Vector3(2740, 1.8, 990);
var posR6 = new BABYLON.Vector3(2240, 1.8, 1140);
var posR7 = new BABYLON.Vector3(1740, 1.8, 1600);

var LOSS_PROX = 20.0;
var WIN_PROX = 5;
var moveWin = {
    "countWin": 0,
    "phaseWin": 0,
    "endAnim": false
}
var lose = {
    "near": false
}

var createScene = function() {
    var checkBox = localStorage.getItem("Night");
    if (checkBox != null) night = (checkBox === "true");

    var bar = localStorage.getItem("Difficulty");
    if (bar != null) difficulty = parseInt(bar);
    LOSS_PROX = LOSS_PROX + (5 * difficulty);

    var scene = new BABYLON.Scene(engine);

    scene.onDispose = function() {
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyUp);

    }

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;

    camera2 = new BABYLON.ArcRotateCamera("Camera", alpha, 0, 30, BABYLON.Vector3(0, 0, 0), scene);
    camera2.setPosition(new BABYLON.Vector3(0, 10, -40));
    camera2.upperRadiusLimit = 500;
    camera2.lowerRadiusLimit = 10;
    camera2.checkCollisions = true;
    camera2.keysLeft = [];
    camera2.keysRight = [];
    camera2.keysUp = [];
    camera2.keysDown = [];

    camera2.attachControl(canvas, false);


    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light.position = new BABYLON.Vector3(1300, 500, 2150);
    if (night) {
        light.intensity = 0.2;
    }
    var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(1300, 500, 1300), scene);
    if (night) {
        light2.intensity = 0.2;
    } else {
        light2.intensity = 0.8;
    }
    light2.groundColor = light.diffuse;
    var light3 = new BABYLON.SpotLight("light3", new BABYLON.Vector3(2570, 30, 2140), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);

    var light4 = new BABYLON.DirectionalLight("dir04", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light4.position = new BABYLON.Vector3(2500, 500, 2100);
    if (night) {
        light4.intensity = 0.2;
    } else {
        light4.intensity = 0.5;
    }

    var music = new BABYLON.Sound("Music", "../audio/Maze.mp3", scene, null, { loop: true, autoplay: true });

    var terrainMaterial = new BABYLON.TerrainMaterial("terrainMaterial", scene);
    terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    terrainMaterial.specularPower = 64;
    terrainMaterial.mixTexture = new BABYLON.Texture("../textures/ground/RGB1.png", scene);

    terrainMaterial.diffuseTexture1 = new BABYLON.Texture("../textures/ground/rock.png", scene);
    terrainMaterial.diffuseTexture2 = new BABYLON.Texture("../textures/ground/dirt.jpg", scene);
    terrainMaterial.diffuseTexture3 = new BABYLON.Texture("../textures/ground/grass.png", scene);

    terrainMaterial.bumpTexture1 = new BABYLON.Texture("../textures/ground/rockn.png", scene);
    terrainMaterial.bumpTexture2 = new BABYLON.Texture("../textures/ground/rockn.png", scene);
    terrainMaterial.bumpTexture3 = new BABYLON.Texture("../textures/ground/grassn.png", scene);

    terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 20;
    terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 20;
    terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 20;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.usePercentageCloserFiltering = true;
    //shadowGenerator.blurKernel = 64;
    //shadowGenerator.forceBackFacesOnly = true;

    var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light3);
    shadowGenerator.usePercentageCloserFiltering = true;
    //shadowGenerator.blurKernel = 64;
    //shadowGenerator.forceBackFacesOnly = true;

    var shadowGenerator3 = new BABYLON.ShadowGenerator(1024, light4);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 64;


    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../textures/ground/HM4.png", 4000, 4000, 200, 0, 400, scene, false);
    //ground.position = new BABYLON.Vector3(0, -2, 0);
    ground.position.y = 1.65;
    ground.position.x = 1400;
    ground.position.z = 600;
    ground.material = terrainMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 4000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    if (night) {
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../textures/skybox/nebula", scene);
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        //scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.0005;
    } else {
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../textures/skybox/TropicalSunnyDay", scene);
    }
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;

    var createRabbit = function(i) {
        BABYLON.SceneLoader.ImportMesh("Rabbit", "../model/", "Rabbit.babylon", scene, function(newMeshes3, particleSystems3, skeletons3) {
            if (i == 0) {
                newMeshes3[0].position = posR1;
            } else if (i == 1) {
                newMeshes3[0].position = posR2;
            } else if (i == 2) {
                newMeshes3[0].position = posR3;
            } else if (i == 3) {
                newMeshes3[0].position = posR4
            } else if (i == 4) {
                newMeshes3[0].position = posR5;
            } else if (i == 5) {
                newMeshes3[0].position = posR6;
            } else if (i == 6) {
                newMeshes3[0].position = posR7;
            }
            newMeshes3[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
            newMeshes3[0].rotate(BABYLON.Axis.Y, 3, BABYLON.Space.LOCAL);
            rabbitSkel[i] = skeletons3[0];
            rabbit[i] = newMeshes3[0];

            var moveRabbit = {
                "countRabb": 0,
                "phaseRabb": 0,
                "changeDirR": 0
            };

            scene.registerBeforeRender(function() {

                animateRabbit(rabbit[i], rabbitSkel[i], moveRabbit);
                if (Math.sqrt(Math.pow(character.position.x - rabbit[i].position.x, 2) + Math.pow(character.position.z - rabbit[i].position.z, 2)) < LOSS_PROX)
                    lose.near = true;
            });
        });
    }


    BABYLON.SceneLoader.ImportMesh("", "../model/", "key3.babylon", scene, function(newMeshes2, particleSystems2, skeletons2) {
        key = newMeshes2[0];
        key.position = new BABYLON.Vector3(2570, 9, 2140);
        //key.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);

        shadowGenerator2.getShadowMap().renderList.push(key);

        key.rotate(BABYLON.Axis.Y, -0.6, BABYLON.Space.LOCAL);

        var moveKey = {
            "count": 1,
            "phase": 0
        };


        scene.registerBeforeRender(function() {

            if (moveKey.count <= 50 && moveKey.phase == 0) {
                key.rotate(BABYLON.Axis.Y, 0.012, BABYLON.Space.LOCAL);
                key.rotate(BABYLON.Axis.X, -0.012, BABYLON.Space.LOCAL);
                moveKey.count++;
                if (moveKey.count == 50) {
                    moveKey.count = 1;
                    moveKey.phase = 1;
                }
            }
            if (moveKey.count <= 50 && moveKey.phase == 1) {
                key.rotate(BABYLON.Axis.X, 0.012, BABYLON.Space.LOCAL);
                key.rotate(BABYLON.Axis.Y, 0.012, BABYLON.Space.LOCAL);
                moveKey.count++;
                if (moveKey.count == 50) {
                    moveKey.count = 1;
                    moveKey.phase = 2;
                }
            }
            if (moveKey.count <= 50 && moveKey.phase == 2) {
                key.rotate(BABYLON.Axis.Y, -0.012, BABYLON.Space.LOCAL);
                key.rotate(BABYLON.Axis.X, 0.012, BABYLON.Space.LOCAL);
                moveKey.count++;
                if (moveKey.count == 50) {
                    moveKey.count = 1;
                    moveKey.phase = 3;
                }
            }
            if (moveKey.count <= 50 && moveKey.phase == 3) {
                key.rotate(BABYLON.Axis.X, -0.012, BABYLON.Space.LOCAL);
                key.rotate(BABYLON.Axis.Y, -0.012, BABYLON.Space.LOCAL);
                moveKey.count++;
                if (moveKey.count == 50) {
                    moveKey.count = 1;
                    moveKey.phase = 0;
                }
            }
        });


    });
    BABYLON.SceneLoader.CleanBoneMatrixWeights = true;

    BABYLON.SceneLoader.ImportMesh("him", "../model/Dude/", "dude.babylon", scene, function(newMeshes, particleSystems, skeletons) {
        character = newMeshes[0];

        for (var index = 0; index < newMeshes.length; index++) {
            shadowGenerator.getShadowMap().renderList.push(newMeshes[index]);
            shadowGenerator3.getShadowMap().renderList.push(newMeshes[index]);
        }
        /*for (var index = 0; index < newMeshes.length; index++) {
            newMeshes[index].receiveShadows = false;;
        }*/
        character.position = new BABYLON.Vector3(0, 2.2, 0);
        //character.position = new BABYLON.Vector3(1700, 2.2, 1750);

        character.applyGravity = true;
        character.ellipsoid = new BABYLON.Vector3(2, 2, 2);
        character.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
        character.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
        characterSkeleton = skeletons[0];
        character.checkCollisions = true;

        for (i in newMeshes)
            characterVec.push(newMeshes[i].id);

        characterSkeleton.bones[13].rotate(BABYLON.Axis.Y, 0.5, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[32].rotate(BABYLON.Axis.Y, -0.5, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[50].rotate(BABYLON.Axis.Y, -0.12, BABYLON.Space.LOCAL, character);
        characterSkeleton.bones[54].rotate(BABYLON.Axis.Y, 0.12, BABYLON.Space.LOCAL, character);

        var torsoInc = characterSkeleton.bones[3].getRotation(BABYLON.Space.LOCAL, character);
        var torsoRot = characterSkeleton.bones[4].getRotation(BABYLON.Space.LOCAL, character);
        var petto = characterSkeleton.bones[5].getRotation(BABYLON.Space.LOCAL, character);
        var neck = characterSkeleton.bones[7].getRotation(BABYLON.Space.LOCAL, character);

        var rightUpperArm = characterSkeleton.bones[13].getRotation(BABYLON.Space.LOCAL, character);
        var rightLowerArm = characterSkeleton.bones[14].getRotation(BABYLON.Space.LOCAL, character);
        var polliceDX = characterSkeleton.bones[16].getRotation(BABYLON.Space.LOCAL, character);
        var indice1DX = characterSkeleton.bones[19].getRotation(BABYLON.Space.LOCAL, character);
        var indice2DX = characterSkeleton.bones[20].getRotation(BABYLON.Space.LOCAL, character);
        var medio1DX = characterSkeleton.bones[22].getRotation(BABYLON.Space.LOCAL, character);
        var medio2DX = characterSkeleton.bones[23].getRotation(BABYLON.Space.LOCAL, character);
        var anulare1DX = characterSkeleton.bones[25].getRotation(BABYLON.Space.LOCAL, character);
        var anulare2DX = characterSkeleton.bones[26].getRotation(BABYLON.Space.LOCAL, character);
        var mignolo1DX = characterSkeleton.bones[28].getRotation(BABYLON.Space.LOCAL, character);
        var mignolo2DX = characterSkeleton.bones[29].getRotation(BABYLON.Space.LOCAL, character);

        var leftUpperArm = characterSkeleton.bones[32].getRotation(BABYLON.Space.LOCAL, character);
        var leftLowerArm = characterSkeleton.bones[33].getRotation(BABYLON.Space.LOCAL, character);
        var polliceSX = characterSkeleton.bones[35].getRotation(BABYLON.Space.LOCAL, character);
        var indice1SX = characterSkeleton.bones[38].getRotation(BABYLON.Space.LOCAL, character);
        var indice2SX = characterSkeleton.bones[39].getRotation(BABYLON.Space.LOCAL, character);
        var medio1SX = characterSkeleton.bones[41].getRotation(BABYLON.Space.LOCAL, character);
        var medio2SX = characterSkeleton.bones[42].getRotation(BABYLON.Space.LOCAL, character);
        var anulare1SX = characterSkeleton.bones[44].getRotation(BABYLON.Space.LOCAL, character);
        var anulare2SX = characterSkeleton.bones[45].getRotation(BABYLON.Space.LOCAL, character);
        var mignolo1SX = characterSkeleton.bones[47].getRotation(BABYLON.Space.LOCAL, character);
        var mignolo2SX = characterSkeleton.bones[48].getRotation(BABYLON.Space.LOCAL, character);

        var rightUpperLeg = characterSkeleton.bones[50].getRotation(BABYLON.Space.LOCAL, character);
        var rightLowerLeg = characterSkeleton.bones[51].getRotation(BABYLON.Space.LOCAL, character);
        var rightFoot = characterSkeleton.bones[52].getRotation(BABYLON.Space.LOCAL, character);
        var rightFrontFoot = characterSkeleton.bones[53].getRotation(BABYLON.Space.LOCAL, character);
        var leftUpperLeg = characterSkeleton.bones[54].getRotation(BABYLON.Space.LOCAL, character);
        var leftLowerLeg = characterSkeleton.bones[55].getRotation(BABYLON.Space.LOCAL, character);
        var leftFoot = characterSkeleton.bones[56].getRotation(BABYLON.Space.LOCAL, character);
        var leftFrontFoot = characterSkeleton.bones[57].getRotation(BABYLON.Space.LOCAL, character);

        var base = {
            "torsoInc": torsoInc,
            "torsoRot": torsoRot,
            "petto": petto,
            "neck": neck,
            "rightUpperArm": rightUpperArm,
            "rightLowerArm": rightLowerArm,
            "polliceDX": polliceDX,
            "indice1DX": indice1DX,
            "indice2DX": indice2DX,
            "medio1DX": medio1DX,
            "medio2DX": medio2DX,
            "anulare1DX": anulare1DX,
            "anulare2DX": anulare2DX,
            "mignolo1DX": mignolo1DX,
            "mignolo2DX": mignolo2DX,
            "leftUpperArm": leftUpperArm,
            "leftLowerArm": leftLowerArm,
            "polliceSX": polliceSX,
            "indice1SX": indice1SX,
            "indice2SX": indice2SX,
            "medio1SX": medio1SX,
            "medio2SX": medio2SX,
            "anulare1SX": anulare1SX,
            "anulare2SX": anulare2SX,
            "mignolo1SX": mignolo1SX,
            "mignolo2SX": mignolo2SX,
            "rightUpperLeg": rightUpperLeg,
            "rightLowerLeg": rightLowerLeg,
            "rightFoot": rightFoot,
            "rightFrontFoot": rightFrontFoot,
            "leftUpperLeg": leftUpperLeg,
            "leftLowerLeg": leftLowerLeg,
            "leftFoot": leftFoot,
            "leftFrontFoot": leftFrontFoot
        };

        var move = {
            "phaseW": -1,
            "countW": 0,
            "phaseR": -1,
            "countR": 0,
            "noAnim": false,
            "wasRunning": false
        };
        scene.registerBeforeRender(function() {

            BABYLON.SceneLoader.CleanBoneMatrixWeights = true;
            character.computeWorldMatrix();
            var WorldMatrix = character.getWorldMatrix(true);
            var localPos = character.getPositionExpressedInLocalSpace();

            var param = 0;
            if (localPos.y > 11.627906560897827) param = -9.8;

            var Pos = new BABYLON.Vector3(localPos.x, localPos.y + 50, localPos.z + 20);
            globalPos = BABYLON.Vector3.TransformNormal(Pos, WorldMatrix);

            camera2.lockedTarget = globalPos;
            //character.applyGravity = true;

            /*if (moveWin.endAnim) {
                winAnimation(character, characterSkeleton, moveWin);
            }*/
            if (keys.upPressed) {
                var moveP = {
                    "param": param
                };

                if (keys.upPressed && !(keys.shiftPressed)) {
                    moveCharacter(character, characterSkeleton, keys, move, base, moveP);
                }
                if (keys.upPressed && keys.shiftPressed) {
                    moveCharacter(character, characterSkeleton, keys, move, base, moveP);
                }
                param = moveP.param;
            }
            if (keys.rightPressed) {
                turnRigth(character, keys);
            }
            if (keys.leftPressed) {
                turnLeft(character, keys);
            }
            if (!keys.upPressed && !keys.shiftPressed && move.noAnim) {
                if (move.wasRunning) {
                    character.position.y += 0.22;
                }
                //character.position.y = -1.78;
                //character.position.y = ground.position.y + 0.3;
                characterSkeleton.bones[3].setRotation(torsoInc, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[4].setRotation(torsoRot, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[5].setRotation(petto, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[7].setRotation(neck, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[13].setRotation(rightUpperArm, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[14].setRotation(rightLowerArm, BABYLON.Space.LOCAL, character);

                characterSkeleton.bones[16].setRotation(polliceDX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[19].setRotation(indice1DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[20].setRotation(indice2DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[22].setRotation(medio1DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[23].setRotation(medio2DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[25].setRotation(anulare1DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[26].setRotation(anulare2DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[28].setRotation(mignolo1DX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[29].setRotation(mignolo2DX, BABYLON.Space.LOCAL, character);

                characterSkeleton.bones[32].setRotation(leftUpperArm, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[33].setRotation(leftLowerArm, BABYLON.Space.LOCAL, character);

                characterSkeleton.bones[35].setRotation(polliceSX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[38].setRotation(indice1SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[39].setRotation(indice2SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[41].setRotation(medio1SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[42].setRotation(medio2SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[44].setRotation(anulare1SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[45].setRotation(anulare2SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[47].setRotation(mignolo1SX, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[48].setRotation(mignolo2SX, BABYLON.Space.LOCAL, character);

                characterSkeleton.bones[50].setRotation(rightUpperLeg, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[51].setRotation(rightLowerLeg, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[54].setRotation(leftUpperLeg, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[55].setRotation(leftLowerLeg, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[52].setRotation(rightFoot, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[53].setRotation(rightFrontFoot, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[56].setRotation(leftFoot, BABYLON.Space.LOCAL, character);
                characterSkeleton.bones[57].setRotation(leftFrontFoot, BABYLON.Space.LOCAL, character);
                move.wasRunning = false;
                move.phaseW = -1;
                move.countW = 0;
                move.phaseR = -1;
                move.countR = 0;
                move.noAnim = false;
            }


        });


    });

    numrabbit = BASE_NUM_RABBIT + difficulty;
    for (var i = 0; i < numrabbit; ++i) {
        createRabbit(i);
    }

    var onKeyDown = function(event) {

        if (event.keyCode == 39) {
            keys.rightPressed = true;
        }
        if (event.keyCode == 37) {
            keys.leftPressed = true;
        }
        if (event.keyCode == 38) {
            keys.upPressed = true;
        }
        if (event.keyCode == 16) {
            keys.shiftPressed = true;
        }
        if (event.keyCode == 27) {
            window.location.href = "../index.html";
        }
    };

    var onKeyUp = function(event) {
        if (event.keyCode == 39) {
            keys.rightPressed = false;
        }
        if (event.keyCode == 37) {
            keys.leftPressed = false;
        }
        if (event.keyCode == 38) {
            keys.upPressed = false;
        }
        if (event.keyCode == 16) {
            keys.shiftPressed = false;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp, false);

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
    if (checkWin()) {
        engine.stopRenderLoop();
        scene.dispose();
        window.location.href = "win.html";
    }
    if (lose.near) {
        engine.stopRenderLoop();
        scene.dispose();
        window.location.href = "loss.html";
    }
});

window.addEventListener("resize", function() {
    engine.resize();
})