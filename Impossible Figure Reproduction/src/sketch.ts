// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function drawCube(x1, y1, z1, s, color) {
    // x1: postion en x sur la grille (x positif vers l'avant/droite)
    // y1: position en y sur la grille (y positif vers l'avant/gauche)
    // z1: postion en z sur la grille (z positif vers le haut)
    // s:size (taille d'un cube)
    // color (tableau de 9 valeurs correspondant à 3 valeurs rgb)

    const gridtopX=width/2
    const gridtopY=height/2
      
    const x=gridtopX+x1*(s/2)*tan(PI/3)-y1*(s/2)*tan(PI/3);
    const y=gridtopY+x1*(s/2)+y1*(s/2)-z1*s;

    let vector = createVector(0,s);
    let points = [];
    
    for(var i = 0; i < 7; i++){
      points.push(createVector(vector.x, vector.y));
      vector = vector.rotate(PI/3);
    }
    
    fill(color[0],color[1],color[2]);
    quad(x,y,x+points[0].x,y+points[0].y,x+points[1].x, y+points[1].y,x+points[2].x, y+points[2].y);

    fill(color[3],color[4],color[5]);
    quad(x,y,x+points[2].x,y+points[2].y,x+points[3].x, y+points[3].y,x+points[4].x, y+points[4].y);
  
    fill(color[6],color[7],color[8]);
    quad(x,y,x+points[4].x,y+points[4].y,x+points[5].x, y+points[5].y,x+points[6].x, y+points[6].y);
  
}

function drawShape(s,c,n){ 
    // s:size (taille d'un cube)
    // c:color (tableau de 9 valeurs correspondant à 3 valeurs rgb) 
    // n:nombre de cubes de côté (4 si petit cube ou 5 si grand cube)

    const m=n-1
    const u=(m/2)-1; //unité qui varie en fonction du mode
    const v=(m/2); //unité qui varie en fonction du mode

    /**/
    drawCube(-v,-v,u-1/4,s,c);
    drawCube(-v,u-1/4,-v,s,c);
    drawCube(u-1/4,-v,-v,s,c);

    drawCube(-v,-v,u,s,c);
    drawCube(-v,u,-v,s,c);
    drawCube(u,-v,-v,s,c);
    
    /**/
    if(m==4){
        drawCube(-v,-v,v,s,c);
        drawCube(-v,v,-v,s,c);
        drawCube(v,-v,-v,s,c);
    }

    /*côté avant*/
    for(var i=1; i<m; i+=1/2){ 
        drawCube(-v+i,v,-v,s,c);
    }
    for(var i=1; i<m; i+=1/2){
        drawCube(v,-v+i,-v,s,c);
    }
    for(var i=0; i<v; i+=1/2){
        drawCube(v,v,-v+i,s,c);
    }

    /*côté gauche*/
    for(var i=1; i<m; i+=1/2){
        drawCube(-v,v,-v+i,s,c);
    }
    for(var i=1; i<m; i+=1/2){
        drawCube(-v,-v+i,v,s,c);
    }
    for(var i=0; i<v; i+=1/2){
        drawCube(-v+i,v,v,s,c);
    }

    /*côté droit*/
    for(var i=1; i<m; i+=1/2){
        drawCube(v,-v,-v+i,s,c);
    }
    for(var i=1; i<m; i+=1/2){
        drawCube(-v+i,-v,v,s,c);
    }
    for(var i=0; i<v; i+=1/2){
        drawCube(v,-v+i,v,s,c);
    }

}
  
var colorblue=[56,127,155,94,186,176,27,49,88];
var colorred=[219,48,4,252,56,6,129,39,45];

function draw() {
    background(31,35,38);
    noStroke();
    drawShape(50,colorblue,5);
    drawShape(25,colorred,4.5);
}

// -------------------

//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}