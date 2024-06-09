const cellSize = 30 ;
const canvasWidth = 600 ;
const canvasHeight = 600 ;
var cols ;
var rows ;
var grid = [] ;
var current ;
var last ;
var stack = [] ;

function setup() {
  //setting how many cols and rows
  cols = floor(canvasWidth/cellSize);
  rows = floor(canvasHeight/cellSize);
  createCanvas(canvasWidth, canvasHeight);//the screen
  //creating the grid values
  for(let y=0 ; y<rows ; y++){
    var minGrid = [] ;
    for(let x=0 ; x<cols ; x++){
      minGrid.push(new cell(x , y)) ;
    }
    grid.push(minGrid);
  }
  //setting current and last variables
  current = grid[0][0] ;
  last = current ;
  stack.push(current);
}

function draw() {
  // frameRate(10);
  background(50);
  //drawing the grid lines
  for(let y=0 ; y<rows ; y++){
    for(let x=0 ; x<cols ; x++){
      grid[y][x].show();
    }
  }
  //drawing current
  fill(0,0,150)
  noStroke();
  square(current.x*cellSize , current.y*cellSize , cellSize);
  //setting the new current and last
  current.visited = true ;
  var nextNeighbor = current.checkNeighbors();
  if(nextNeighbor) {
    stack.push(nextNeighbor);//pushing the current to the stack
    last = current ;
    current = nextNeighbor ;
    removeLines() ;
  }
  else if(stack.length > 0){
    current = stack.pop() ;//removing visited elements from stack
  }else{
    console.log("end");
    noLoop();
  }
}
//creating the cell constructor
function cell(x , y){
  this.x = x ;
  this.y = y ;
  this.visited = false;
  this.walls = [true , true , true , true]
  // show function to show the grid 
  this.show = function(){
    let W = cellSize ;
    let X = this.x*W ;
    let Y = this.y*W ;
    stroke(190);
    strokeWeight(3);
    if(this.walls[0]) line(X  ,Y  ,X+W,Y  ); //top
    if(this.walls[1]) line(X+W,Y  ,X+W,Y+W);//right
    if(this.walls[2]) line(X+W,Y+W,X  ,Y+W);//bottom
    if(this.walls[3]) line(X  ,Y+W,X  ,Y  );//left
    //drawing the visited celles
    if(this.visited){
      noStroke();
      fill(100);
      square(X,Y,W);
    }
  }
  //function to check neighbors
  this.checkNeighbors = function(){
    //checking the top,right,bottom and left of current cell  
    if(y!=0){//top
      var top = grid[y-1][x];
    }else var top = undefined ;
    if(x!=19){//right
      var right = grid[y][x+1];
    }else var right = undefined ;
    if(y!=19){//bottom
      var bottom = grid[y+1][x];
    }else var bottom = undefined ;
    if(x!=0){//left
      var left = grid[y][x-1];
    }else var left = undefined ;
    //creating and drawing neighbors 
    let neighbors = [] ;
    fill(0,255,0,50);
    noStroke();
    if(top && !top.visited) {//top
      neighbors.push(top);
      square(top.x*cellSize , top.y*cellSize , cellSize);
    }
    if(right && !right.visited) {//right
      neighbors.push(right);
      square(right.x*cellSize , right.y*cellSize , cellSize);
    }
    if(bottom && !bottom.visited) {//bottom
      neighbors.push(bottom);
      square(bottom.x*cellSize , bottom.y*cellSize , cellSize);
    }
    if(left && !left.visited) {//left
      neighbors.push(left);
      square(left.x*cellSize , left.y*cellSize , cellSize);
    }

    //getting a random neighbor
    if(neighbors[0]){
      let next = neighbors[floor(random(0,neighbors.length))];
      return next ;
    }else return undefined ;
    
  }
}
//function to remove lines 
function removeLines(){
  var xDifferance = current.x - last.x ;
  var yDifferance = current.y - last.y ;
  //remove rows lines
  if(xDifferance == 1){
    current.walls[3] = false ;
    last.walls[1] = false ;
  }else if(xDifferance == -1){
    current.walls[1] = false ;
    last.walls[3] = false ;
  }
  //remove cols lines
  if(yDifferance == 1){
    current.walls[0] = false ;
    last.walls[2] = false ;
  }else if(yDifferance == -1){
    current.walls[2] = false ;
    last.walls[0] = false ;
  }
}






