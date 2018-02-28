

var Block = function(_type) {

  this.pos = createVector(3*block_size, 0);
  this.type = _type;
  this.rotation_index = 0;
  this.matrix = block_matrix[this.type][this.rotation_index];
  this.color = block_color[this.type];

  this.draw = function() {

    for (let xx = 0; xx < this.matrix.length; xx++) {
      for (let yy = 0; yy < this.matrix[xx].length; yy++) {

        if (this.pos.y <= 0) break;
        else if (this.pos.y <= block_size) yy++;

        if (this.matrix[xx][yy] == 1) {
          push();
          fill(this.color);
          stroke(0);
          rect(this.pos.x + (xx*block_size), this.pos.y + (yy*block_size), block_size, block_size);
          pop();
        }
      }
    }

  }

  this.move = function(_x, _y) {

    this.pos.x += _x * block_size;
    this.pos.y += _y * block_size;

  }

  this.collide = function(_matrix, _x, _y) {

    let pos_x = (this.pos.x/block_size); // x in matrix
    let pos_y = (this.pos.y/block_size); // y
    let temp_matrix;

    if (_x == 0 && _y == 0) { // rotate

      let temp_index = this.rotation_index < block_matrix[this.type].length-1 ? this.rotation_index+1 : 0; // change rotation_index
      temp_matrix = block_matrix[this.type][temp_index]; // save rotatet matrix for check

    } else { // left / right / bottom

      temp_matrix = this.matrix;

    }
    // loop temp matrix
    for (let xx = temp_matrix.length-1; xx >= 0; xx--) {
      for (let yy = temp_matrix[xx].length-1; yy >= 0; yy--) {
        // check
        if (temp_matrix[xx][yy] == 1) { // 1 = block / 0 = emty
          if (pos_x + xx + _x < 0 || pos_x + xx + _x >= _matrix.length || pos_y + yy + _y >= _matrix[0].length || // walls (left || right || down)
          _matrix[pos_x + xx + _x][pos_y + yy + _y] != undefined) { // blocks in matrix (left || right || down)
            
            return true;
          }
        }

      }
    }

    return false;

  }


  this.pushInMatrix = function(_matrix) {

    for (let xx = 0; xx < this.matrix.length; xx++) {
      for (let yy = 0; yy < this.matrix[xx].length; yy++) {

        if (this.matrix[xx][yy] == 1)
          _matrix[(this.pos.x/block_size) + xx][(this.pos.y/block_size) + yy] = this.type;

      }

    }

  }

  this.rotate = function() {
    // loop rotation index
    this.rotation_index = this.rotation_index < block_matrix[this.type].length-1 ? this.rotation_index+1 : 0;;
    // save next matrix
    this.matrix = block_matrix[this.type][this.rotation_index];

  }

}
