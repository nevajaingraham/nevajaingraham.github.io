var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'Clown',x:100, y:200},
                {type: 'Clown',x:200, y:300},
               
            ]
        };
        for (var i =0; i <levelData.gameItems.length; i++) {
    // Create a sawblade using the .x and .y property of gameItem 
    if(levelData.gameItems[i].type === "sawblade"){
    createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
    } else {
        createClown(levelData.gameItems[i].x, levelData.gameItems[i].y)
    }
    
        }
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        // default hitzone variables and damage
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
  // creating a saw blade
  
  
    function createSawBlade(x,y) {
    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
    myObstacle.x = x;
    myObstacle.y = y;
    game.addGameItem(myObstacle);    
    var obstacleImage = draw.bitmap('img/sawblade.png');
    myObstacle.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
}


    
    // creating a clown
function createClown(x,y) {
   
      var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
    myObstacle.x = x;
    myObstacle.y = y;
    game.addGameItem(myObstacle);    
    var obstacleImage = draw.bitmap('img/Clown.png');
    myObstacle.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
 
           
}
// creating enemy
function createEnemy(x, y){
var enemy =  game.createGameItem('enemy',25);

var redSquare = draw.rect(50,50,'red');
redSquare.x = -25;
redSquare.y = -25;
enemy.addChild(redSquare);

enemy.x = x;
enemy.y = y;

enemy.velocityX = -1;
enemy.rotationalVelocity = 10;

enemy.onPlayerCollision = function() {
    console.log('The enemy has hit Halle');
    game.changeIntegrity(-10);
    enemy.fadeOut();
};

enemy.onProjectileCollision = function() {
    console.log('Halle has hit the enemy');
    game.increaseScore(100);
    enemy.fadeOut();
}

game.addGameItem(enemy);
}


createEnemy(400,groundY-10);
createEnemy(800,groundY-100);
createEnemy(1200,groundY-50);

function createReward(x, y) {
var enemy =  game.createGameItem('enemy',25);

var redSquare = draw.rect(50,50,'blue');
redSquare.x = -25;
redSquare.y = -25;
enemy.addChild(redSquare);

enemy.x = x;
enemy.y = y;

enemy.velocityX = -1;
enemy.rotationalVelocity = 10;

enemy.onPlayerCollision = function() {
    console.log('The enemy has hit Halle');
    game.increaseScore(100);
    enemy.fadeOut();
};


game.addGameItem(enemy);
}
createReward(500,groundY-50);
    };


};
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}