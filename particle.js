function Particle() {

    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 1;
    this.history = [];
    
    this. update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
        
        let v = createVector(this.pos.x, this.pos.y);

        this.history.push(v);


        if (this.history.length > 20) {
        this.history.splice(0, 1);
        }
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function() {
        noStroke();
        strokeWeight(4);
        // beginShape();
        let prevPoint = createVector(0,0);
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            let alpha = map(i, 0, this.history.length, 0, 255);
            let rad = map(i, 0, this.history.length, 15, 1);
            fill(255, alpha);
            ellipse(p.x, p.y, rad, rad);

            // endShape();
        }
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