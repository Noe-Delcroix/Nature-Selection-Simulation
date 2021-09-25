var vehicles=[]
var food=[]
var poison=[]

function setup() {
  createCanvas(580, 580);
  check=createCheckbox("Debug info",false)
  addFood(food,60)
  addFood(poison,40)
  
    for (let i=0;i<150;i++){
      vehicles.push(new Vehicle(random(width),
                                random(height),
                                random(-1,1),
                                random(-1,1),
                                random(20,100),
                                random(20,100)))  
  }
  
}

function draw() {
  background(30);
  noStroke()
  fill(0,255,0)
  for (let f of food){
    circle(f.x,f.y,6) 
  }
  fill(255,0,0)
  for (let p of poison){
    circle(p.x,p.y,6) 
  }
  for (let v=vehicles.length-1;v>=0;v--){
    vehicles[v].render()
    vehicles[v].update()
    vehicles[v].behaviors()
    if (vehicles[v].delete){
      vehicles.splice(v,1) 
    }
    
  }
}

function addFood(List,n){
  for (let i=0;i<n;i++){ 
    
    while(true){
      let ok=true
      let temppos=createVector(random(30,width-30),random(30,height-30))
      for (let f of food){
        if (temppos.dist(f)<15){
          ok=false      
        }
      }
      for (let p of poison){
        if (temppos.dist(p)<15){
          ok=false      
        }
      }
      if (ok){
        List.push(temppos)
        break
      }
        
    }
  }
}