var stockCubes = [];
var gui = new dat.GUI();
var params = {
    Couleur_Fond: "#1F2326",
    CubeSize: 50,
    Download_Image: function () { return save(); },
    No_Grid_Mode: false,
    Mode_Clavier: false,
    Color: 1,
    Mode_Face: 0,
    Reset: function () { return stockCubes = []; },
};
gui.addColor(params, "Couleur_Fond").name('Background color');
gui.add(params, "CubeSize", 1, 200, 1).name('Cube Size');
gui.add(params, "Color", 1, 6, 1).listen().name('Cube color');
gui.add(params, "Mode_Face", 0, 6, 1).name('Cubes variations');
gui.add(params, "Mode_Clavier").name('Activate keyboard mode');
gui.add(params, "No_Grid_Mode").name('No grid mode');
gui.add(params, "Reset");
gui.add(params, "Download_Image").name('Download image');
function drawCube(x1, y1, s, color, m, ngm) {
    var gridtopX = 0;
    var gridtopY = 0;
    var x = gridtopX + (Math.floor(x1 / s)) * ((s / 2) / tan(PI / 6));
    var y = gridtopY + (Math.floor(y1 / s)) * s + (s / 2) * ((-1) ^ Math.floor(x1 / s) % 2);
    if (ngm == true) {
        x = x1;
        y = y1;
    }
    var vector = createVector(0, s);
    var points = [];
    for (var i = 0; i < 7; i++) {
        points.push(createVector(vector.x, vector.y));
        vector = vector.rotate(PI / 3);
    }
    if (m != 1 && m != 5 && m != 6) {
        fill(color[0], color[1], color[2]);
        quad(x, y, x + points[0].x, y + points[0].y, x + points[1].x, y + points[1].y, x + points[2].x, y + points[2].y);
    }
    if (m != 2 && m != 4 && m != 6) {
        fill(color[3], color[4], color[5]);
        quad(x, y, x + points[2].x, y + points[2].y, x + points[3].x, y + points[3].y, x + points[4].x, y + points[4].y);
    }
    if (m != 3 && m != 4 && m != 5) {
        fill(color[6], color[7], color[8]);
        quad(x, y, x + points[4].x, y + points[4].y, x + points[5].x, y + points[5].y, x + points[6].x, y + points[6].y);
    }
}
function colorvar(c) {
    switch (c) {
        case 1:
            return [56, 127, 155, 94, 186, 176, 27, 49, 88];
        case 2:
            return [219, 48, 4, 252, 56, 6, 129, 39, 45];
        case 3:
            return [247, 195, 5, 247, 222, 5, 247, 178, 5];
        case 4:
            return [106, 151, 62, 137, 184, 62, 77, 116, 52];
        case 5:
            return [225, 225, 225, 255, 255, 255, 200, 200, 200];
        default:
            return [13, 13, 13, 25, 25, 25, 0, 0, 0];
    }
}
var clavierX = 0;
var clavierY = 0;
function updateClavierXY() {
    if ((keyIsPressed == true) && ((keyCode == DOWN_ARROW) || (key == 'S') || (key == 's'))) {
        clavierY += 10;
    }
    if ((keyIsPressed == true) && ((keyCode == UP_ARROW) || (key == 'Z') || (key == 'z'))) {
        clavierY -= 10;
    }
    if ((keyIsPressed == true) && ((keyCode == RIGHT_ARROW) || (key == 'D') || (key == 'd'))) {
        clavierX += 10;
    }
    if ((keyIsPressed == true) && ((keyCode == LEFT_ARROW) || (key == 'Q') || (key == 'q'))) {
        clavierX -= 10;
    }
}
function draw() {
    background(params.Couleur_Fond);
    noStroke();
    for (var i = 0; i < stockCubes.length; i += 6) {
        drawCube(stockCubes[i], stockCubes[i + 1], stockCubes[i + 2], stockCubes[i + 3], stockCubes[i + 4], stockCubes[i + 5]);
    }
    if (params.Mode_Clavier == true) {
        updateClavierXY();
        drawCube(clavierX, clavierY, params.CubeSize, colorvar(params.Color), params.Mode_Face, params.No_Grid_Mode);
    }
    else {
        drawCube(mouseX, mouseY, params.CubeSize, colorvar(params.Color), params.Mode_Face, params.No_Grid_Mode);
    }
    if (mouseIsPressed == true || ((keyIsPressed == true) && (keyCode == ENTER))) {
        if (params.Mode_Clavier == true) {
            stockCubes.push(clavierX, clavierY, params.CubeSize, colorvar(params.Color), params.Mode_Face, params.No_Grid_Mode);
        }
        else {
            stockCubes.push(mouseX, mouseY, params.CubeSize, colorvar(params.Color), params.Mode_Face, params.No_Grid_Mode);
        }
    }
    if (keyIsPressed == true && (key == 'u' || key == 'U')) {
        for (var i = 0; i < 6; i++) {
            stockCubes.pop();
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map