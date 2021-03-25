var stockCubes = []; // tableau pour stocker les cubes

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Couleur_Fond: "#1F2326",
    CubeSize: 50,
    Download_Image: () => save(),
    No_Grid_Mode:false,
    Mode_Clavier:false,
    Color:1,
    Mode_Face:0,
    Reset:() => stockCubes=[],
}
gui.addColor(params, "Couleur_Fond").name('Background color') // pour changer la couleur du fond
gui.add(params, "CubeSize", 1, 200, 1).name('Cube Size') // pour changer la taille des cubes
gui.add(params, "Color", 1, 6, 1).listen().name('Cube color') // pour changer la couleur des cubes (6 possibles)
gui.add(params, "Mode_Face", 0, 6, 1).name('Cubes variations') // changer les faces à afficher
gui.add(params, "Mode_Clavier").name('Activate keyboard mode') // utilise les flèches pour déplacer le cube
gui.add(params, "No_Grid_Mode").name('No grid mode') // enlève le magnétisme 
gui.add(params,"Reset") // réinitialiser le dessin
gui.add(params, "Download_Image").name('Download image') // télécharger l'image

// -------------------
//       Drawing
// -------------------

function drawCube(x1, y1, s, color, m, ngm) {
    // c:column 
    // r:row
    // z:hauteur
    // s:size
    // color:tableau de couleur
    // m:mode(utilisé pour enlever une face d'un cube)
    // ngm:mode2(utilisé pour distinguer les coord clavier et souris)

    const gridtopX=0
    const gridtopY=0;
    
    var x=gridtopX+(Math.floor(x1/s))*((s/2)/tan(PI/6));
    var y=gridtopY+(Math.floor(y1/s))*s+(s/2)*((-1)^Math.floor(x1/s)%2);

    /*if (params.Mode_Clavier==true){
        x=gridtopX+x1*(s/2)*tan(PI/3)-y1*(s/2)*tan(PI/3);
        y=gridtopY+x1*(s/2)+y1*(s/2);
    }      */

    if (ngm==true){
        x=x1;
        y=y1;
    }      

    /* construction du cube autour du centre x,y */

    let vector = createVector(0,s);
    let points = [];
    
    for(var i = 0; i < 7; i++){
      points.push(createVector(vector.x, vector.y));
      vector = vector.rotate(PI/3);
    }
    
    if(m!=1&&m!=5&&m!=6){
      fill(color[0],color[1],color[2]);
      quad(x,y,x+points[0].x,y+points[0].y,x+points[1].x, y+points[1].y,x+points[2].x, y+points[2].y);
    }
  
    if(m!=2&&m!=4&&m!=6){
      fill(color[3],color[4],color[5]);
      quad(x,y,x+points[2].x,y+points[2].y,x+points[3].x, y+points[3].y,x+points[4].x, y+points[4].y);
    }
  
    if(m!=3&&m!=4&&m!=5){
      fill(color[6],color[7],color[8]);
      quad(x,y,x+points[4].x,y+points[4].y,x+points[5].x, y+points[5].y,x+points[6].x, y+points[6].y);
    }
  
}

/* Fonction pour les couleurs*/
function colorvar(c){
    switch(c){ // tableau couleur moyenne (left) / couleur claire (top) / couleur foncée (right)
        case 1:
            return [56,127,155,94,186,176,27,49,88]; //blue
        case 2:
            return [219,48,4,252,56,6,129,39,45]; //red
        case 3:
            return [247,195,5,247,222,5,247,178,5]; //yellow
        case 4:
            return [106,151,62,137,184,62,77,116,52]; //green
        case 5:
            return [225,225,225,255,255,255,200,200,200]; //white
        default:
            return [13,13,13,25,25,25,0,0,0] //black
    }    
}

var clavierX=0;
var clavierY=0;

function updateClavierXY(){
    if ((keyIsPressed == true) && ((keyCode == DOWN_ARROW)||(key == 'S')||(key == 's'))){
        clavierY+=10
    }
    if ((keyIsPressed == true) && ((keyCode == UP_ARROW)||(key == 'Z')||(key == 'z'))){ 
        clavierY-=10
    }
    if ((keyIsPressed == true) && ((keyCode == RIGHT_ARROW)||(key == 'D')||(key == 'd'))){
        clavierX+=10
    }
    if ((keyIsPressed == true) && ((keyCode == LEFT_ARROW)||(key == 'Q')||(key == 'q'))){
        clavierX-=10
    }
}


function draw() {

    background(params.Couleur_Fond);
    noStroke();

    /* affiche les blocs posés */
    for(var i=0; i<stockCubes.length;i+=6){
        drawCube(stockCubes[i],stockCubes[i+1],stockCubes[i+2],stockCubes[i+3],stockCubes[i+4],stockCubes[i+5]);
    }

    /* affichage du cube en mode clavier*/
    if (params.Mode_Clavier==true){
        updateClavierXY();
        drawCube(clavierX,clavierY,params.CubeSize,colorvar(params.Color),params.Mode_Face,params.No_Grid_Mode);
    }

    /* affichage du cube en mode normal */
    else{
        drawCube(mouseX,mouseY,params.CubeSize,colorvar(params.Color),params.Mode_Face,params.No_Grid_Mode);
    }

    /* enregistre les blocs posés si on clique ou appuie sur entrée*/
    if( mouseIsPressed==true || ((keyIsPressed == true) && (keyCode == ENTER)) ){
        if (params.Mode_Clavier==true){
            stockCubes.push(clavierX,clavierY,params.CubeSize,colorvar(params.Color),params.Mode_Face,params.No_Grid_Mode);
        }
        else{
            stockCubes.push(mouseX,mouseY,params.CubeSize,colorvar(params.Color),params.Mode_Face,params.No_Grid_Mode);
        }
    }

    /* supprime le dernier élément si on appuie sur u*/
    if(keyIsPressed == true && (key=='u'|| key=='U')){
        for ( var i = 0; i < 6; i++ ) {
            stockCubes.pop();
        }
    }
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