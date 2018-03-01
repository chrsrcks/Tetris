

var Game = function(_pos, _player) {

  this.player = _player;
  this.input = input[_player];
  this.matrix = createArray2D(10, 22);
  this.matrix_pos = _pos;
  this.current_block = new Block(floor(random(7)));
  this.next_block_type = floor(random(7));
  this.level_speed = 1000;
  this.timer = millis() + this.level_speed;
  this.score = 0;
  this.level = 0;
  this.score_lines = 0;
  this.temp_lines = []; // lines clear effect
  this.wait_lines = 0;


  this.draw = function() {

    push();
    translate(this.matrix_pos.x, this.matrix_pos.y);

    // draw emty & sitting blocks
    this.matrix_draw();
    // draw preview & points & input control
    this.preview_draw();
    this.score_draw();
    this.control_draw();
    // draw clear effect
    this.drawClearLines();

    // game loop
    if (this.current_block != -1) {

      this.current_block.draw(); // draw current block

      // input speed down && colide bottom && pos.y >= 2
      if (keyIsDown(this.input.fast_down) && !this.current_block.collide(this.matrix, 0, 1) && this.current_block.pos.y >= 2*block_size)
        this.current_block.move(0 ,1); // move y +1

      if (!pause) {

        //this.timer ++;
        if (this.timer <= millis()) { // timer
          this.timer = millis() + this.level_speed;
          this.temp_lines = [];

          if (this.current_block.collide(this.matrix, 0, 1)) { // collide bottom

            this.current_block.pushInMatrix(this.matrix);

            this.temp_lines = this.check_lines(); // check full lines & return array with yy
            if (this.temp_lines.length > 0) {
              this.clear_lines(); // clear all full lines
              this.update_score();
              sound.line.play();
               // 2 player mode - save lines to other player
              if (this.player == 1)  player_2.wait_lines = this.temp_lines.length;
              else if (this.player == 2)  player_1.wait_lines = this.temp_lines.length;
            }

            // 2 player mode - push lines in matrix
            this.pushLines(this.wait_lines);
            this.wait_lines = 0;

            // check GAME OVER
            if (this.checkGameOver()) { // GAME OVER
              this.current_block = -1; // stop game loop
              sound.gameover.play();
              // return;
            } else { // NO GAME OVER = next block
              this.current_block = new Block(this.next_block_type);
              this.next_block_type = floor(random(7));
            }

          } else { // NOT collide bottom
            // move down
            this.current_block.move(0 ,1);  // move y +1
          }

        }
      }

    } else { // GAME OVER

      this.draw_GameOver();
    }

    pop();


  }

  this.matrix_draw = function() {

    for (let xx = this.matrix.length-1; xx >= 0; xx--) {
      for (let yy = this.matrix[xx].length-1; yy >= 2; yy--) { // NOT 0 & 1

        push();
        if (this.matrix[xx][yy] !== undefined) { // block
          fill(block_color[this.matrix[xx][yy]]); // color
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

  this.preview_draw = function() {

    let temp_matrix = block_matrix[this.next_block_type][0];

    push();
    stroke(50);
    noFill();
    rect(-(block_size*8), 2*block_size, block_size*6, block_size*6);

    for (let xx = 0; xx < temp_matrix.length; xx++) {
      for (let yy = 0; yy < temp_matrix[xx].length; yy++) {

        if (temp_matrix[xx][yy] == 1) {
          fill(block_color[this.next_block_type]);
          stroke(0);
          rect(-(block_size*7) + (xx*block_size), (block_size*4) + (yy*block_size), block_size, block_size);
        }
      }
    }
    pop();

  }

  this.score_draw = function() {

    push();
    stroke(50);
    noFill();
    rect(-(block_size*8), block_size*10, block_size*6, block_size*4);
    noStroke();
    fill(150);
    textSize(10);
    text('SCORE :', -(block_size*7), block_size*11);
    text('LEVEL :', -(block_size*7), block_size*12);
    text('LINES :', -(block_size*7), block_size*13);
    fill(200);
    text(this.score, -(block_size*4), block_size*11);
    text(this.level, -(block_size*4), block_size*12);
    text(this.score_lines, -(block_size*4), block_size*13);
    pop();

  }

  this.control_draw = function() {

    push();
    stroke(50);
    noFill();
    rect(-(block_size*8), block_size*16, block_size*6, block_size*6);
    noStroke();
    fill(150);
    textSize(8);
    for (let i = 0; i < Object.keys(key_name[this.player]).length; i++) { // Object.entries(this.input)
      fill(150);
      text(Object.keys(key_name[this.player])[i] +' :', -(block_size*7.5), (block_size*17)+(i*block_size));
      fill(200);
      text(Object.values(key_name[this.player])[i], -(block_size*5), (block_size*17)+(i*block_size)); // [Object.values(this.input)[i]]
    }
    pop();

  }

  this.update_score = function() {

    this.score_lines += this.temp_lines.length;
    this.score += this.temp_lines.length * this.temp_lines.length; // + 1, 4, 9, 16 points
    if (this.score >= (this.level * this.level) * 10) {
      this.level ++; // level +1
      this.level_speed = round(this.level_speed*0.9); // speed -10 %
    }

  }

  this.check_lines = function() {

    let blocks = 0;
    let lines = [];

    for (let yy = this.matrix[0].length-1; yy >= 0; yy--) {
      for (let xx = this.matrix.length-1; xx >= 0; xx--) {

        if (this.matrix[xx][yy] !== undefined)
          blocks ++;
      }
      if (blocks == this.matrix.length)  lines.push(yy);
      blocks = 0;
    }

    return lines;

  }

  this.clear_lines = function () {

    for (let i = this.temp_lines.length-1; i >= 0; i--) {
      for (let xx = this.matrix.length-1; xx >= 0; xx--) {
        this.matrix[xx][this.temp_lines[i]] = undefined;

        for (let j = this.temp_lines[i]; j >= 0; j--) {
          if (this.matrix[xx][j] !== undefined) {
            this.matrix[xx][j + 1] = this.matrix[xx][j];
            this.matrix[xx][j] = undefined;
          }
        }
      }
    }

  }

  this.drawClearLines = function() {

    for (let i = this.temp_lines.length-1; i >= 0; i--) {
      for (let xx = this.matrix.length-1; xx >= 0; xx--) {

        if (this.timer%10 < 5) {
          push();
          fill(255);
          stroke(255);
          rect(xx*block_size, this.temp_lines[i]*block_size, block_size, block_size); // rectangle
          pop();
        }

      }
    }

  }

  this.checkGameOver = function() {

    // check 2 top lines for game over
    for (let i = this.matrix.length-1; i >= 0; i--) {
      if (this.matrix[i][0] !== undefined || this.matrix[i][1] !== undefined) {

        return true;
      }
    }

    return false;

  }

  this.draw_GameOver = function() {

    push();
    textSize(50);
    textAlign(LEFT, CENTER);
    fill(255);
    strokeWeight(10);
    stroke(0);
    text('GAME OVER', -block_size*2, block_size*12);
    pop();

  }

  this.pushLines = function(_lines) {

    for (let yy = 2; yy < this.matrix[0].length; yy++) {
      let random_block = floor(random(this.matrix.length));
      for (let xx = this.matrix.length-1; xx >= 0; xx--) {

        if (yy >= _lines)
          this.matrix[xx][yy - _lines] = this.matrix[xx][yy];

        if (yy >= this.matrix[0].length - _lines) {

          if (xx != random_block)  this.matrix[xx][yy] = floor(random(7));
          else  this.matrix[xx][yy] = undefined;
        }

      }
    }

  }


}
