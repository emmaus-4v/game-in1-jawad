


/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library
   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

var spelStatus = 0;
var balX;
var balY;
var balStraal=6;
var zwaarteKracht = 0.1;
var verticaleBalSnelheid = -10;
var stuiterWeerstand = 0.1;
var luchtWeerstand =  0.001;
var racketBreedte = 200;
var racketHoogte = 20;
var horizontaleBalSnelheid = 4;
var muurL;
var muurR;
var muurY1;
var muurY2;
var sterkte;
var score;

function setup() {
  createCanvas(1280, 720);
  balX=200;
  balY=100;  
  frameRate(60);
  muur = maakMuur();
}

function draw() {
 
  if (spelStatus == 0) {
    UITLEG();
  } else if (spelStatus == 1) {
    SPELEN();
  } else if (spelStatus == 2) {
    GAMEOVER();
  }
}
/********* De verschillende schermen (uitleg, spel en eind scherm) *********/
function UITLEG() {
  
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Klik om te starten", 640, 360);  
}
function SPELEN() {
  
  background(200);
  
  var pBalY = balY;
  
  
  balX = balX + horizontaleBalSnelheid;
  if ( balX < balStraal ) {
    balX = balStraal;
    horizontaleBalSnelheid = -1 * horizontaleBalSnelheid;
  }
  if ( balX > (width - balStraal) ) {
    balX = (width - balStraal);
    horizontaleBalSnelheid = -1 * horizontaleBalSnelheid;
  }
  
  
  verticaleBalSnelheid = verticaleBalSnelheid + zwaarteKracht;
   
  
  verticaleBalSnelheid = verticaleBalSnelheid - luchtWeerstand * verticaleBalSnelheid;  
  
  
  balY = balY + verticaleBalSnelheid;
  
  
  if ( balY  > ( height - balStraal ) ) {
    
    balY = height - balStraal;
  
    verticaleBalSnelheid = verticaleBalSnelheid * -1;
    
    
    verticaleBalSnelheid = verticaleBalSnelheid - stuiterWeerstand * verticaleBalSnelheid;
  }
  
 
  if ( balY  <  balStraal ) {
    
    balY = balStraal;
    
    verticaleBalSnelheid = verticaleBalSnelheid * -1;
    
    verticaleBalSnelheid = verticaleBalSnelheid - stuiterWeerstand * verticaleBalSnelheid;
  }
  
  if ( (balX  > mouseX-(racketBreedte/2)) && 
       (balX  < mouseX+(racketBreedte/2))) {
    
    var pTopRacket = pmouseY - racketHoogte / 2;
    var topRacket = mouseY - racketHoogte / 2;
    
   
    if ( pTopRacket >= (pBalY + balStraal ) ) {    
      if ( topRacket < (balY + balStraal ) ) {
        
        var verschil = pmouseY - mouseY;
        verticaleBalSnelheid = verticaleBalSnelheid + verschil;      
        horizontaleBalSnelheid = (balX - mouseX)/10;
        
       
        balY = topRacket - balStraal;      
        
        verticaleBalSnelheid = verticaleBalSnelheid * -1;
        
        verticaleBalSnelheid = verticaleBalSnelheid - stuiterWeerstand * verticaleBalSnelheid;       
      }
    }
  }  
  
  tekenBal();
  verplaatsMuur();
  tekenMuur();
  tekenRacket();
  
  if ( raaktBalMuur() ) {
    sterkte -=  0.5;
    // als de sterkte 0 is, laat het GAMEOVER scherm zien
    if (sterkte <= 0 ) {
      spelStatus = 2;
    }
  }
  
  fill(0,60,0);
  textSize(29);
  textAlign(LEFT);
  text("Score   : " + score, 10,100);  
  text("Sterkte : " + int(sterkte), 10,120);  
  
}
function GAMEOVER() {
  // code voor het game over scherm
  background(0);
  fill(255);
  textSize(90);
  textAlign(CENTER);
  text("Game Over", 640, 360);  
}
/********* INVOER *********/
function mousePressed() {
  // als we in het start scherm getoond wordt en de muis knop wordt ingedrukt,
  // dan laten we het startScherm zien
  if (spelStatus==0) {
    startGame();
  }
}
/********* HULP FUNCTIES *********/
// Functie die wordt uitgevoerd als het spelletje moet beginnnen 
function startGame() {
  spelStatus=1;
  sterkte = 100;
  score = 0;
}
function tekenBal() {
  fill(0);
  ellipse(balX, balY, balStraal * 2);
}
function tekenRacket(){
  fill(255,0,100);
  rectMode(CENTER);
  rect(mouseX, mouseY, racketBreedte, racketHoogte);
}
function verplaatsMuur() {
  var muurVerplaatsSnelheid = 3;
  muurL = muurL - muurVerplaatsSnelheid;
  muurR = muurR - muurVerplaatsSnelheid;
  // als muur helemaal van het scherm is, maak
  // een nieuwe muur
  if ( muurR <= 0 ) {
    score = score + 1;
    maakMuur();
  }
}
function maakMuur() {
  muurL = width;
  muurR = width + random(100,200);
  var gatHoogte = random( 200,300 );
  
  muurY1 = random( 0, height - gatHoogte );
  muurY2 = muurY1 + gatHoogte; 
}
function tekenMuur() {
  
  fill (0,0,150, 200); 
  rectMode(CORNERS);
  rect( muurL, 0 , muurR, muurY1 );
  rect( muurL, muurY2, muurR, height );
}
function raaktBalMuur()
{
  if ( balX > muurL && balX < muurR) {
    if ( balY < muurY1 || balY > muurY2) {
      return true;
    }
  }
  return false;
}






