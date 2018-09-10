


var Button = function(t, x, y, w, h, exe) { // TODO dest optional

    this.text = t; // name
    this.x = x; // current pos x
    this.y = y; // current pos y
    this.w = w; // width
    this.h = h; // heigh
    this.exe = exe; // function
  
    this.mouseOver = function(mx, my) {

        if (mx > this.x-(this.w/2) && mx < this.x + (this.w/2)
         && my > this.y-(this.h/2) && my < this.y + (this.h/2))
            return true;
  
        return false;

    }
  
    this.draw = function() {

        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        
        stroke(0,0,0);
        if (this.mouseOver(mouseX,mouseY)) stroke(255,255,255);
        fill(100,100,100);
        rect(0, 0, this.w, this.h);
        fill(0,0,0);
        if (this.mouseOver(mouseX,mouseY)) fill(255,255,255);
        textAlign(CENTER,CENTER);
        text(this.text, 0, 0, this.w, this.h);
        pop();

    }

}