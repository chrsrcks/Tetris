var pre_mouse_pos;

function setInput() {

  let input = [
    { // solo player_0
      left: LEFT_ARROW,
      right: RIGHT_ARROW,
      down: DOWN_ARROW,
      rotate: UP_ARROW,
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
      left: LEFT_ARROW,
      right: RIGHT_ARROW,
      down: DOWN_ARROW,
      rotate: UP_ARROW,
      fast_down: 13 // enter
    },
    { // mobile player_3
      left: left_swipe,
      right: RIGHT_SWIPE,
      down: DOWN_SWIPE,
      fast_down: DOWN_SWIPE
    }
  ];

  return input;

}

function keyPressed() {

  if (!player_1 && !player_2) {
    if (keyCode === 49)  player_1 = new Game( createVector((width*0.5) - (5*block_size), (height/2) - (12*block_size)), 0 );
    else if (keyCode === 50) {
      player_1 = new Game( createVector((width*0.35) - (5*block_size), (height/2) - (12*block_size)), 1 );
      player_2 = new Game( createVector((width*0.75) - (5*block_size), (height/2) - (12*block_size)), 2 );
    }
  }

  if (player_1 && player_1.current_block != -1 && player_1.current_block.pos.y >= 2*block_size) {
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

  if (player_2 && player_2.current_block != -1 && player_2.current_block.pos.y >= 2*block_size) {
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

function mouseReleased() {

  if (!player_1) {

    player_1 = new Game(createVector((width*0.5) - (2*block_size), (height/2) - (12*block_size)), 3);

  } else if (drag_start <= millis()+100 && !player_1.current_block.collide(player_1.matrix, 0, 0)) {
    player_1.current_block.rotate(player_1.matrix);
    sound.turn.play();

  } else if (player_1 && player_1.current_block != -1 && player_1.current_block.pos.y >= 2*block_size) {
    if (player_1.input.left() && !player_1.current_block.collide(player_1.matrix, -1, 0)) { // left
      player_1.current_block.move(-1, 0);
      sound.move.play();

    } else if (player_1.input.right() && !player_1.current_block.collide(player_1.matrix, 1, 0)) { // right
      player_1.current_block.move(1, 0);
      sound.move.play();

    } else if (player_1.input.down() && !player_1.current_block.collide(player_1.matrix, 0, 1)) { // down
      player_1.current_block.move(0, 1);
      sound.move.play();
    }

  }

  pre_mouse_pos.x = 0;
  pre_mouse_pos.y = 0;

}



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

function left_swipe() {

  if (mouseX < pre_mouse_pos.x)
    return true;
  else
    return false;

}

function RIGHT_SWIPE() {

  if (mouseX > pre_mouse_pos.x)
    return true;
  else
    return false;

}

function DOWN_SWIPE() {

  if (mouseY > pre_mouse_pos.y)
    return true;
  else
    return false;

}
