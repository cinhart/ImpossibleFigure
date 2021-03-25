var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
};
gui.add(params, "Download_Image");
function drawCube(x1, y1, z1, s, color) {
    var gridtopX = width / 2;
    var gridtopY = height / 2;
    var x = gridtopX + x1 * (s / 2) * tan(PI / 3) - y1 * (s / 2) * tan(PI / 3);
    var y = gridtopY + x1 * (s / 2) + y1 * (s / 2) - z1 * s;
    var vector = createVector(0, s);
    var points = [];
    for (var i = 0; i < 7; i++) {
        points.push(createVector(vector.x, vector.y));
        vector = vector.rotate(PI / 3);
    }
    fill(color[0], color[1], color[2]);
    quad(x, y, x + points[0].x, y + points[0].y, x + points[1].x, y + points[1].y, x + points[2].x, y + points[2].y);
    fill(color[3], color[4], color[5]);
    quad(x, y, x + points[2].x, y + points[2].y, x + points[3].x, y + points[3].y, x + points[4].x, y + points[4].y);
    fill(color[6], color[7], color[8]);
    quad(x, y, x + points[4].x, y + points[4].y, x + points[5].x, y + points[5].y, x + points[6].x, y + points[6].y);
}
function drawShape(s, c, n) {
    var m = n - 1;
    var u = (m / 2) - 1;
    var v = (m / 2);
    drawCube(-v, -v, u - 1 / 4, s, c);
    drawCube(-v, u - 1 / 4, -v, s, c);
    drawCube(u - 1 / 4, -v, -v, s, c);
    drawCube(-v, -v, u, s, c);
    drawCube(-v, u, -v, s, c);
    drawCube(u, -v, -v, s, c);
    if (m == 4) {
        drawCube(-v, -v, v, s, c);
        drawCube(-v, v, -v, s, c);
        drawCube(v, -v, -v, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(-v + i, v, -v, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(v, -v + i, -v, s, c);
    }
    for (var i = 0; i < v; i += 1 / 2) {
        drawCube(v, v, -v + i, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(-v, v, -v + i, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(-v, -v + i, v, s, c);
    }
    for (var i = 0; i < v; i += 1 / 2) {
        drawCube(-v + i, v, v, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(v, -v, -v + i, s, c);
    }
    for (var i = 1; i < m; i += 1 / 2) {
        drawCube(-v + i, -v, v, s, c);
    }
    for (var i = 0; i < v; i += 1 / 2) {
        drawCube(v, -v + i, v, s, c);
    }
}
var colorblue = [56, 127, 155, 94, 186, 176, 27, 49, 88];
var colorred = [219, 48, 4, 252, 56, 6, 129, 39, 45];
function draw() {
    background(31, 35, 38);
    noStroke();
    drawShape(50, colorblue, 5);
    drawShape(25, colorred, 4.5);
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 0.75;
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