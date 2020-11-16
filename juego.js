document.addEventListener('click', function(event){ 
    if(nivel.muerto == false){
        saltar(); 
    } else{ 
        nivel.velocidad = 6;
        nivel.muerto = false;
        cactus.x = ancho +100; 
        nivel.puntos = 0;
    }
})//saltar

var imgRex, imgNube, imgCactus, imgSuelo;
function cargaImagenes() {
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();
    imgRex.src = 'images/trex.png';
    imgNube.src = 'images/nube.png';
    imgCactus.src = 'images/cactus.png';
    imgSuelo.src = 'images/suelo3.png';
}

var ancho = 700;
var alto = 300;
var canvas, ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}

function borrarCanvas(){  
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
//vy: velocidad en y para saltar
var trex = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = {velocidad: 6, puntos: 0, muerto: false};
var cactus = {x: ancho + 100, y: suelo+1};
var nube = {x: 400, y: 100};
var suelog = {x:0, y:suelo + 40};

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,614,661,100,trex.y, 50, 50);
}
function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,192,203,cactus.x, cactus.y, 50, 50);
}
function dibujaNube(){
    ctx.drawImage(imgNube,0,0,270,107,nube.x, nube.y, 100, 40);
}

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,552,64,0, suelog.y,2000, 10);
}

function logicaCactus(){
    if(cactus.x < - 100){
        cactus.x = ancho +100;
        nivel.puntos += 1;
    } else {
        cactus.x -= nivel.velocidad;
    }
}

function logicaNube(){
    if(nube.x < - 100){
        nube.x = ancho +100;
    } else {
        nube.x -= nivel.velocidad;
    }
}


function logicaSuelo(){
    if(suelog.x > 250){
        suelog.x = 0;
    } else {
        suelog.x += nivel.velocidad;
    }
}


function saltar(){
    if (trex.vy >= trex.salto){
        
    } else{
        trex.vy = trex .salto; 
        trex.saltando = true;
    }
}
 
function gravedad(){
    if(trex.saltando){
        if(trex.y - trex.gravedad - trex.vy> suelo) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y=suelo;
        }else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;//si es mayor a 250
        }
    }
}

// Colision
function colision(){
    //cactus.x
    //trex.y
    if(cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo-50){
            nivel.muerto = true;
            nivel.velocidad = 0;
        }
    }
}

//puntuación

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555';
    ctx.fillText(`${nivel.puntos}`, 600,50);

    if(nivel.muerto){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240,150);
    }
}

// --- principal
var FPS = 50;

setInterval(function(){
    principal();
}, 1000/FPS)

function principal (){
    borrarCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaRex();
    dibujaCactus();
    dibujaNube();
    dibujaSuelo();
    puntuacion();
}
