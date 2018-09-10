/*******************************************************************************
Name: Tetris clone
Autor: Christopher Ruckes
Date: 23.02.2018
*******************************************************************************/

var player_1, player_2, block_size;
var block_matrix = [
  [[[0, 1], [0, 1], [0, 1], [0, 1]], [[0, 0, 0, 0], [1, 1, 1, 1]]],
  [[[1, 1], [1, 1]]],
  [[[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1, 0]]],
  [[[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]]],
  [[[1, 1], [1, 0], [1, 0]], [[1, 0, 0], [1, 1, 1]], [[0, 1], [0, 1], [1, 1]], [[1, 1, 1], [0, 0, 1]]],
  [[[1, 0], [1, 0], [1, 1]], [[0, 0, 1], [1, 1, 1]], [[1, 1], [0, 1], [0, 1]], [[1, 1, 1], [1, 0, 0]]],
  [[[1, 0], [1, 1], [1, 0]], [[0, 1, 0], [1, 1, 1]], [[0, 1], [1, 1], [0, 1]], [[1, 1, 1], [0, 1, 0]]]
];
var block_color = [
  [255, 0, 0],
  [255, 255, 0],
  [0, 0, 255],
  [0, 255, 0],
  [0, 255, 255],
  [255, 0, 255],
  [122, 0, 122]
];
var sound = {}, buttons = [];
var pause = false, font, text_y;
// ============================== preload =====================================
function preload() {
  sound.move = loadSound('audio/tetris_move.wav');
  sound.turn = loadSound('audio/tetris_turn.wav');
  sound.line = loadSound('audio/tetris_line.wav');
  sound.gameover = loadSound('audio/tetris_gameover.wav');
  font = loadFont('font/oldGame.ttf');
} // --------------------------------------------------------------------------
// ============================== setup =======================================
function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  block_size = floor(min(width/20, height/24));
  textFont(font);
  text_y = -(5*block_size);
  pre_mouse_pos = createVector(0,0);
  buttons.push( new Button('1 Player', width/2, height*.5, 150, 40, ()=> {
    if (!player_1)
        player_1 = new Game( createVector((width*0.5) - (5*block_size), (height/2) - (12*block_size)), 0 );
  }));
  buttons.push( new Button('2 Player', width/2, height*.6, 150, 40, ()=> {
    if (!player_1 && !player_2) {
        player_1 = new Game( createVector((width*0.35) - (5*block_size), (height/2) - (12*block_size)), 1 );
        player_2 = new Game( createVector((width*0.75) - (5*block_size), (height/2) - (12*block_size)), 2 );
    }
  }));
  buttons.push( new Button('Fullscreen', width-85, 30, 150, 40, ()=> {
    let fs = fullscreen(); // get
    fullscreen(!fs); // set 
  }));
  buttons.push( new Button('Pause', 60, 30, 90, 40, ()=> pause = !pause ));
} // --------------------------------------------------------------------------
// ============================== draw ========================================
function draw() {
  background(32);

  if (!player_1)  draw_start();
  else {
    player_1.draw();
    buttons[3].draw();
    if (player_2) player_2.draw();
    if (pause) draw_pause();
  }          
  
  buttons[2].draw();
  
} // --------------------------------------------------------------------------
// ============================== draw_start ==================================
function draw_start() {

  if (text_y < height*.2 && frameCount % 20 === 1) text_y += block_size; // move intro text blocks

  push();
  translate(width*.5, text_y);

  // draw 'TETRIS' with blocks
  for (let i = 0; i < text_matrix.length; i++) {
    for (let yy = 0; yy < text_matrix[i].length; yy++) {
      for (let xx = 0; xx < text_matrix[i][yy].length; xx++) {

        if (text_matrix[i][yy][xx] == 1) {
          fill(block_color[i]); // color
          //strokeWeight(2);
          stroke(0);
          rect(-(9*block_size)+(i*(3*block_size))+(xx*block_size), yy*block_size, block_size, block_size);
        }
      }
    }
  }
  pop();

  for (let i=buttons.length-2; i>=0; i--) {
    buttons[i].draw();
  }

} // --------------------------------------------------------------------------
// ============================== draw pause ==================================
function draw_pause() {

  push();

  textSize(50);
  textStyle(BOLD);
  fill(255);
  textAlign(CENTER,CENTER);
  text('PAUSE', width/2, height/2);

  pop();

}

// intro text block matrix
var text_matrix = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1]
  ]
];


function createArray2D(_w, _h) {

  let arr = Array(_w);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(_h);
  }

  return arr;

}
