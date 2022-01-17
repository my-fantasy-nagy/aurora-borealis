function Particle() {
    // this.pos = createVector(random(width), random(height));
    this.maxSpeed = 2;
    this.pos = createVector(0, random(height));
    this.vel = createVector(2,0);
    this.acc = createVector(0,0);

    this. update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function() {
        stroke(0);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

    this.finishedDraw = function() {
        if(this.pos.x > width){
            return true;
        }
        else return false;
    }

    this.edgesTopBot = function(){
        if (this.pos.y > height) this.pos.y = height;
        if (this.pos.y < 0) this.pos.y = 0;
    }

    this.edges = function(){
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    this.follow = function(vectors) {
        x = floor(this.pos.x / scl);
        y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

}