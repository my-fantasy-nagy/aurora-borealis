
function Particle() {
    
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.history = [];
    this.primaryColor;
    
    //UPDATE PARTICLE PHYSICS
    this. update = function() {

        //UPDATE PHYSICS
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(MAX_SPEED);
        this.acc.mult(0);
        

        //PUSH CURRENT POSITION TO HISTORY ARRAY
        let v = createVector(this.pos.x, this.pos.y);
        this.history.push(v);
        if (this.history.length > TAIL_LENGTH) {
            this.history.splice(0, 1);
        }
    }

    //APPLY FORCE TO PARTICLE
    this.applyForce = function(force){
        this.acc.add(force);
    }

    // SHOW PARTICLE
    this.show = function() {
        
        // DISPLAY TAILS
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            let alpha = map(i, 0, this.history.length, 0, 255);
            let rad = map(i, 0, this.history.length, 15, 1);
            let fillCol = this.primaryColor;
            fillCol.setAlpha(alpha);
            fill(this.primaryColor);
            noStroke();
            ellipse(p.x, p.y, rad, rad);
        }
    }
        
    // TELEPORT AT EDGES
    this.edges = function(){
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    // APPLY FORCEFIELD
    this.follow = function(vectors) {
        x = floor(this.pos.x / scl);
        y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    // APPLY MOUSE PUSH/PULL BEHAVIOR
    this.followMouse = function(spacePressed){
        let mouseVector = createVector(mouseX, mouseY);
        mouseVector.sub(this.pos);
        mouseVector.setMag(3);
        if(spacePressed){
            mouseVector.mult(-1, -1);    
        }
        this.applyForce(mouseVector);
    }

    // ASSIGN RANDOM PRIMARY COLOR
    this.rollColor = function(){
        let roll = floor(random(0,3));
        if(roll === 0){
            this.primaryColor = color(255,0,0);
        }
        else if(roll === 1){
            this.primaryColor = color(255,255,0);
        }
        else if(roll === 2){
            this.primaryColor = color(0,0,255);
        }
        else this.color(255);
    }
}