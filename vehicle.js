class Vehicle {
  constructor(x, y, Fweight,Pweight,Frange,Prange) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.maxspeed = 3
    this.acc = createVector(random(-this.maxspeed,this.maxspeed), random(-this.maxspeed,this.maxspeed))
    this.maxforce = 0.4
    this.arrive = 0
    this.size = 6
    this.delete=false
    
    //this.dna=[1,-2,100,20]
    this.dna=[]
    this.dna.push(Fweight)
    this.dna.push(Pweight)
    this.dna.push(abs(Frange))
    this.dna.push(abs(Prange))
    
    this.health=1
    
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.health-=0.005
    if (this.health<=0){
      this.delete=true 
    }
    if (random(0,1)<0.0005){
      vehicles.push(new Vehicle(this.pos.x,
                                this.pos.y,
                                this.dna[0]+random(-0.2,0.2),
                                this.dna[1]+random(-0.2,0.2),
                                this.dna[2]+random(-10,10),
                                this.dna[3]+random(-10,10)))    
    } 
  }

  applyForce(force) {
    this.acc.add(force)

  }

  seek(target) {
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.desired = p5.Vector.sub(createVector(width / 2, height / 2), this.pos)
    } else {
      this.desired = p5.Vector.sub(target, this.pos)
    }


    if (this.desired.mag() < this.arrive) {
      this.desired.setMag(map(this.desired.mag(), 0, this.arrive, 0, this.maxspeed))
    } else {
      this.desired.setMag(this.maxspeed)
    }


    let steer = p5.Vector.sub(this.desired, this.vel)
    steer.limit(this.maxforce)
    steer.mult(1)
    return steer
  }

  stayOnScreen(){
    if (this.pos.x<0 || this.pos.x>width || this.pos.y<0 || this.pos.y>height){
      this.applyForce(this.seek(createVector(width/2,height/2))) 
      
    }
    
  }
  
  render() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    fill(lerpColor(color(0),color(255),this.health))
    strokeWeight(0.5)
    stroke(255)
    triangle(-this.size, -this.size, -this.size, this.size, this.size * 3, 0)
    if (check.checked()){
      noFill()
      strokeWeight(2)
      stroke(0,255,0)
      line(0,0,this.dna[0]*50,0)
      circle(0,0,this.dna[2]*2)
      stroke(255,0,0)
      line(0,0,this.dna[1]*50,0)      
      circle(0,0,this.dna[3]*2)
    }
    pop()
  }

  eat(List,value, perception) {
    let record = Infinity
    let closest = -1
    for (let f = 0; f < List.length; f++) {
      let d = this.pos.dist(List[f])
      if (d < record && d < perception) {
        closest = f
        record = d
      }
    }
    if (closest>-1){
      if (this.pos.dist(List[closest])<10){
        List.splice(closest,1)
        addFood(List,1)
        this.health+=value
      }else{
        return this.seek(createVector(List[closest].x,List[closest].y)) 
      } 
    }
    return createVector(0,0) 
  }

  behaviors() {
    this.stayOnScreen()
    
    if (food.length>0){
      this.applyForce(this.eat(food,0.15,this.dna[2]).mult(this.dna[0]))
    }
    if (poison.length>0){
      this.applyForce(this.eat(poison,-0.8,this.dna[3]).mult(this.dna[1]))
    }


  }
}