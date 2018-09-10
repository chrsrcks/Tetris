
// set key codes
var input = [
  { // solo player_0
    left: 37,
    right: 39,
    down: 40,
    rotate: 38,
    fast_down: 32 // space
  },
  { // 1vs1 player_1
    left: 65, // A
    right: 68, // D
    down: 83, // S
    rotate: 87, // W
    fast_down: 32 // space
  },
  { // 1vs1 player_2
    left: 37,
    right: 39,
    down: 40,
    rotate: 38,
    fast_down: 13 // enter
  }
];
// set key names
var key_name = [
  { // solo player_0
    left: 'LEFT',
    right: 'RIGHT',
    down: 'DOWN',
    rotate: 'UP',
    fast_down: 'SPACE'
  },
  { // 1vs1 player_1
    left: 'A',
    right: 'D',
    down: 'S',
    rotate: 'W',
    fast_down: 'SPACE'
  },
  { // 1vs1 player_2
    left: 'LEFT',
    right: 'RIGHT',
    down: 'DOWN',
    rotate: 'UP',
    fast_down: 'ENTER'
  }
];

// ==================================== key pressed =========================================================
function keyPressed() {

  // block move player 1
  if (player_1 && player_1.current_block != -1 && player_1.current_block.pos.y >= block_size && !pause) {
    if (keyCode === player_1.input.left && !player_1.current_block.collide(player_1.matrix, -1, 0)) { // left
      player_1.current_block.move(-1, 0);
      sound.move.play();
    } else if (keyCode === player_1.input.right && !player_1.current_block.collide(player_1.matrix, 1, 0)) { // right
      player_1.current_block.move(1, 0);
      sound.move.play();
    } else if (keyCode === player_1.input.down && !player_1.current_block.collide(player_1.matrix, 0, 1)) { // down
      player_1.current_block.move(0, 1);
      sound.move.play();
    } else if (keyCode === player_1.input.rotate && !player_1.current_block.collide(player_1.matrix, 0, 0)) { // up
      player_1.current_block.rotate(player_1.matrix);
      sound.turn.play();
    }
  }
  // block move player 2
  if (player_2 && player_2.current_block != -1 && player_2.current_block.pos.y >= block_size  && !pause) {
    if (keyCode === player_2.input.left && !player_2.current_block.collide(player_2.matrix, -1, 0)) {
      player_2.current_block.move(-1, 0);
      sound.move.play();
    } else if (keyCode === player_2.input.right && !player_2.current_block.collide(player_2.matrix, 1, 0)) {
      player_2.current_block.move(1, 0);
      sound.move.play();
    } else if (keyCode === player_2.input.down && !player_2.current_block.collide(player_2.matrix, 0, 1)) {
      player_2.current_block.move(0, 1);
      sound.move.play();
    } else if (keyCode === player_2.input.rotate && !player_2.current_block.collide(player_2.matrix, 0, 0)) {
      player_2.current_block.rotate(player_2.matrix);
      sound.turn.play();
    }
  }

}

function mouseClicked() {

  for (let i in buttons) {
    if (buttons[i].mouseOver(mouseX,mouseY))
      buttons[i].exe();
  }

}