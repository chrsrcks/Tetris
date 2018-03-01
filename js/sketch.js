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
  [0, 0, 255],
  [0, 255, 0],
  [255, 255, 0],
  [0, 255, 255],
  [255, 0, 255],
  [122, 0, 122]
];
var input = [];
var sound = {};
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

  input = setInput();
  pre_mouse_pos = createVector(0,0);
} // --------------------------------------------------------------------------
// ============================== draw ========================================
function draw() {
  background(32);

  if (!player_1)  draw_start();
  else  player_1.draw();
  if (player_2)  player_2.draw();

  draw_fullscreen_icon();
} // --------------------------------------------------------------------------
// ============================== draw_start ==================================
function draw_start() {

  if (text_y < height*.2 && frameCount%10 == 0) text_y += block_size;

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
  push();
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(200);
  noStroke();
  let temp_text;
  if (width > height)
    temp_text = 'key 1 = 1 player\nkey 2 = 2 player'
  else
    temp_text = 'Touch to start!';
  text(temp_text, width*.5, height*.5);
  pop();

} // --------------------------------------------------------------------------

// start text block matrix
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

function draw_fullscreen_icon() {

  push();
  textSize(50);
  textStyle(BOLD);
  fill(255);
  textAlign(LEFT, TOP);
  if (player_1) {
    if (pause) {
      text('>', 5, 5);
      text('PAUSE', width/2, height/2)
    } else {
      text('"', 5, 5);
    }
  }
  textAlign(RIGHT, TOP);
  if (fullscreen())  text('-', width-10, 10);
  else  text('^', width-10, 10);
  pop();

}

function createArray2D(_w, _h) {

  let arr = Array(_w);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(_h);
  }

  return arr;

}
