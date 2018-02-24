/*******************************************************************************
Name: Tetris clone
Autor: Christopher Ruckes
Date: 23.02.2018
*******************************************************************************/

var matrix, matrix_pos, current_block, next_block_type;
const block_size = 30;
var timer=0, level=0, points=0, level_speed = 60;
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
var temp_lines = [], score_lines=0;
var sound = {};

function preload() {
  sound.move = loadSound('tetris_move.wav');
  sound.turn = loadSound('tetris_turn.wav');
  sound.line = loadSound('tetris_line2.wav');
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);

  matrix = createArray2D(10, 20);
  matrix_pos = createVector((width/2) - (5*block_size), (height/2) - (10*block_size));

  current_block = new Block(round(random(6)));
  next_block_type = round(random(6));

}

function draw() {
  background(32);

  push();
  translate(matrix_pos.x, matrix_pos.y);

  // draw emty & sitting blocks
  matrix_draw();
  // draw preview & points
  preview_draw(next_block_type);
  // draw clear effect
  drawClearLines(temp_lines);

  // game loop
  if (current_block != -1) {

    current_block.draw(); // draw current block

    // key space hold = block move down
    if (keyIsDown(32) && !current_block.collide(0, 1)) // 32 = space
      current_block.move(0 ,1); // move y +1

    timer ++;
    if (timer >= level_speed) { // timer
      timer = 0;
      temp_lines = [];

      if (current_block.collide(0, 1)) { // collide bottom

        current_block.pushInMatrix();
        temp_lines = check_lines(); // check full lines & return array with yy
        clear_lines(temp_lines); // clear all full lines
        if (temp_lines.length > 0)  sound.line.play();
        score_lines += temp_lines.length;
        points += temp_lines.length * temp_lines.length; // + 1, 4, 9, 16 points
        if (points >= (level * level) * 16) {
          level ++;
          level_speed -= (level/10) * 60; // speed - level in %
        }

        // check top line for game over
        for (let i = matrix.length-1; i >= 0; i--) { // for (let i = matrix.length-3; i >= 2; i--) {
          if (matrix[i][0] !== undefined) { // block in top line = game over
            current_block = -1; // stop game loop
            return;
          }
        }
        // NO GAME OVER
        current_block = new Block(next_block_type);
        next_block_type = round(random(6));

      } else { // NOT collide bottom
        // move down
        current_block.move(0 ,1);  // move y +1
      }

    }

  } else { // GAME OVER

    push();
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255);
    strokeWeight(16);
    stroke(0);
    text('GAME OVER', (width/2) - matrix_pos.x, (height/2) - matrix_pos.y);
    pop();
  }

  pop();

}

function matrix_draw() {

  for (let xx = matrix.length-1; xx >= 0; xx--) {
    for (let yy = matrix[xx].length-1; yy >= 0; yy--) {

      push();
      if (matrix[xx][yy] !== undefined) { // block
        fill(block_color[matrix[xx][yy]]); // color
        stroke(0);
      } else { // emty
        noFill();
        stroke(50);
      }
      rect(xx*block_size, yy*block_size, block_size, block_size); // rectangle
      pop();

    }
  }

}

function keyPressed() {

  if (current_block != -1) {
    if (keyCode === LEFT_ARROW && !current_block.collide(-1, 0)) {
      current_block.move(-1, 0);
      sound.move.play();
    } else if (keyCode === RIGHT_ARROW && !current_block.collide(1, 0)) {
      current_block.move(1, 0);
      sound.move.play();
    } else if (keyCode === DOWN_ARROW && !current_block.collide(0, 1)) {
      current_block.move(0, 1);
      sound.move.play();
    } else if (keyCode === UP_ARROW && !current_block.collide(0, 0)) {
      current_block.rotate();
      sound.turn.play();
    }
  }

}

function check_lines() {

  let blocks = 0;
  let lines = [];

  for (let yy = matrix[0].length-1; yy >= 0; yy--) {
    for (let xx = matrix.length-1; xx >= 0; xx--) {

      if (matrix[xx][yy] !== undefined)
        blocks ++;
    }
    if (blocks == 10)  lines.push(yy);
    blocks = 0;
  }

  return lines;
}

function clear_lines(_lines) {

  for (let i = _lines.length-1; i >= 0; i--) {
    for (let xx = matrix.length-1; xx >= 0; xx--) {
      matrix[xx][_lines[i]] = undefined;

      for (let j = _lines[i]; j >= 0; j--) {
        if (matrix[xx][j] !== undefined) {
          matrix[xx][j + 1] = matrix[xx][j];
          matrix[xx][j] = undefined;
        }
      }
    }
  }

}


function drawClearLines(_lines) {

  for (let i = _lines.length-1; i >= 0; i--) {
    for (let xx = matrix.length-1; xx >= 0; xx--) {

      if (timer%12 == 0) {
        push();
        fill(255);
        stroke(255);
        rect(xx*block_size, _lines[i]*block_size, block_size, block_size); // rectangle
        pop();
      }

    }
  }

}

function preview_draw(_type) {

  let temp_matrix = block_matrix[_type][0];

  push();

  for (let xx = 0; xx < temp_matrix.length; xx++) {
    for (let yy = 0; yy < temp_matrix[xx].length; yy++) {

      if (temp_matrix[xx][yy] == 1) {
        push();
        fill(block_color[_type]);
        stroke(0);
        rect(-(block_size*7) + (xx*block_size), (block_size*2) + (yy*block_size), block_size, block_size);
        pop();
      }
    }
  }

  stroke(50);
  noFill();
  rect(-(block_size*8), 0, block_size*6, block_size*6);
  // level & points
  rect(-(block_size*8), block_size*8, block_size*6, block_size*4);
  noStroke();
  fill(150);
  textSize(14);
  text('SCORE :', -(block_size*7), block_size*9);
  text('LEVEL :', -(block_size*7), block_size*10);
  text('LINES :', -(block_size*7), block_size*11);
  fill(200);
  text(points, -(block_size*4), block_size*9);
  text(level, -(block_size*4), block_size*10);
  text(score_lines, -(block_size*4), block_size*11);
  pop();

}


function createArray2D(w, h) {

  let arr = Array(w);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(h);
  }

  return arr;

}
