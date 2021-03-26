//Create variables here
var dog, happyDog, database, foodS = 0, foodStock, milkImg, fedTime, lastFed, foodObj, addFood, feedPet, food;
var changeGameState, readGameState, bedroom, garden, washroom, gameState;

function preload() {
  //load images here
  dog1 = loadImage('images/Dog.png');
  dog2 = loadImage("images/happyDog.png");
  milkImg = loadImage("images/Milk.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(1000, 500);

  database = firebase.database();

  dog = createSprite(900, 200, 50, 50);
  dog.addImage(dog1);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  addFood = createButton('Add Food');
  addFood.position(800, 95);
  addFood.mousePressed(AddFood);
  feedPet = createButton('Feed Pet');
  feedPet.position(700, 95);
  feedPet.mousePressed(FeedPet);

  food = new Food();

  readGameState = database.ref('gameState');
  readGameState.on("value", function (data) {
    gameState = data.val();
  });
}


function draw() {
  background(46, 139, 87);

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed: " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Fed: 12 AM", 350, 30);
  } else {
    text("Last Fed: " + lastFed + "AM", 350, 30)
  }

  if(gameState != "Hungry"){
    feedPet.hide();
    dog.x = 10000;
    addFood.hide();
  }else{
    feedPet.show();
    addFood.show();
    dog.x = 900;
    dog.addImage(dog1);
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    food.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    food.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    food.washroom();
  }else{
    update("Hungry");
    food.display();
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })

  drawSprites();

  
}

//Function to read values from Database
function readStock(data) {
  foodS = data.val();
}

//Function to write values from Database
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}

function AddFood() {
  foodS++;
  console.log(foodS);
  database.ref('/').update({
    Food: foodS
  })
}

function FeedPet() {
  dog.addImage(dog2);

  if (foodS > 0) {
    foodS--;
  }
  database.ref('/').update({
    Food: foodS,
    FeedTime: hour()
  })
}

function update(State){
  database.ref('/').update({
    gameState: State
  });
}