/*******************************************************************************
Name: Tetris clone
Autor: Christopher Ruckes
Date: 23.02.2018
*******************************************************************************/

var player_1, player_2;
var block_size;
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
var input = [], drag_time=0;
var sound = {};
var font;
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
  block_size = round(min(width/20, height/24));

  textFont(font);

  input = setInput();
  pre_mouse_pos = createVector(0,0);
} // --------------------------------------------------------------------------
// ============================== draw ========================================
function draw() {
  background(32);

  if (!player_1)  draw_start();
  else  player_1.draw();
  if (player_2)  player_2.draw();

  if (mouseIsPressed) {
    drag_time++;
    if (pre_mouse_pos.x == 0 && pre_mouse_pos.y == 0) {
      pre_mouse_pos.x = mouseX;
      pre_mouse_pos.y = mouseY;
    }
  }
  //else drag_time = 0;
} // --------------------------------------------------------------------------
// ============================== draw_start ==================================
function draw_start() {

  push();
  translate(width*.5, height*.2);

  // draw 'TETRIS' with blocks
  for (let i = 0; i < text_matrix.length; i++) {
    for (let yy = 0; yy < text_matrix[i].length; yy++) {
      for (let xx = 0; xx < text_matrix[i][yy].length; xx++) {

        if (text_matrix[i][yy][xx] == 1) {
          fill(block_color[i]); // color
          //strokeWeight(2);
          stroke(0);
          rect(-(11*block_size)+(i*(4*block_size))+(xx*block_size), yy*block_size, block_size, block_size);
        }
      }
    }
  }
  pop();
  push();
  // textAlign(CENTER, CENTER);
  // textStyle(BOLD);
  // textSize(150);
  // strokeWeight(2);
  // stroke(0);
  // let temp_text = 'TETRIS';
  // for (let i = temp_text.length-1; i >= 0; i--) {
  //   fill(block_color[i]);
  //   text(temp_text[i], (width*.3) + (i*120), height*.4);
  // }
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(200);
  noStroke();
  text('key 1 = 1 player\nkey 2 = 2 player', width*.5, height*.5);

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

function createArray2D(_w, _h) {

  let arr = Array(_w);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(_h);
  }

  return arr;

}
