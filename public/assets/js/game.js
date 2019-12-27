//var url = require('url');
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var gameOver = false;
var scoreText;
var currentScore=0;
var currentUser;

var game = new Phaser.Game(config);

$.ajax({
    type: 'GET',
    url: '/scores',
    success: function(data) {
        scores = data;
        console.log(scores);
    },
    error: function(xhr) {
        console.log(xhr);
    }
});

function preload ()
{
  this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  this.load.audio('audio_beam', ["assets/sounds/beam.ogg","assets/sounds/beam.mp3"]);
  this.load.audio('audio_explosion', ["assets/sounds/explosion.ogg","assets/sounds/explosion.mp3"]);
  this.load.audio('audio_pickup', ["assets/sounds/pickup.ogg","assets/sounds/pickup.mp3"]);
  this.load.audio('music', ["assets/sounds/sci-fi_platformer12.ogg","assets/sounds/sci-fi_platformer12.mp3"]);
}

function create ()
{
  this.beamSound = this.sound.add("audio_beam");
  this.explosionSound = this.sound.add("audio_explosion");
  this.pickupSound = this.sound.add("audio_pickup");
  this.music = this.sound.add("music");

  var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
  }
  this.music.play(musicConfig);

  //  A simple background for our game
  this.add.image(400, 300, 'sky');

  this.add.bitmapText(40, 50, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);

    currentUser = querystring("id")[0];

    for (let i = 1; i < 6; i++) {
    if (scores[i-1]) {
      if (scores[i-1].email == currentUser)  {
          currentScore = scores[i-1].highScore;
      }
      this.add.bitmapText(40, 70 + 30 * i, 'arcade', ` ${i}      ${scores[i-1].highScore}    ${scores[i-1].name}`).setTint(0xffffff);
    }
    //else {
    //  this.add.bitmapText(40, 70 + 30 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
    //}
  }

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // The player and its settings
  player = this.physics.add.sprite(100, 450, 'dude');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {

    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  bombs = this.physics.add.group();

  //  The score

  scoreText = this.add.text(16, 16, 'score: ' +currentScore , { fontSize: '32px', fill: '#000' });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}


function update ()
{
  if (gameOver)
  {
    return;
  }

  if (cursors.left.isDown)
  {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else
  {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
    player.setVelocityY(-330);
  }
}

function collectStar (player, star)
{
  this.pickupSound.play();

  star.disableBody(true, true);

  //  Add and update the score
  currentScore += 10;
  scoreText.setText('My Score: ' + currentScore);
    updateScore(currentUser,currentScore)

  if (stars.countActive(true) === 0)
  {
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function updateScore(id,currentScore) {
    var data = {
        email: id,
        score: currentScore
    };
    $.ajax({
        type: 'POST',
        url: '/submit-score',
        data,
        success: function (data) {
            console.log(JSON.stringify(data));
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    });
}

function hitBomb (player, bomb)
{
  this.explosionSound.play();

  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}

function querystring(obj) {
    const result = [];
    let match;
    const re = new RegExp('(?:\\?|&)' + obj + '=(.*?)(?=&|$)', 'gi');
    while ((match = re.exec(document.location.search)) !== null) {
        result.push(match[1]);
    }
    return result;
}