function checkWin() {
    if (character == null || key == null) return false;
    return controlDistance(character, key) < WIN_PROX;
}

function controlDistance(mesh1, mesh2) {
    return Math.sqrt(Math.pow(mesh1.position.x - mesh2.position.x, 2) + Math.pow(mesh1.position.z - mesh2.position.z, 2));
}