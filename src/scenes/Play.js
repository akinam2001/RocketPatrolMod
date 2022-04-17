class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('magic', './assets/magic.png');
        this.load.image('book1', './assets/book1.png');
        this.load.image('book2', './assets/book2.png');
        this.load.image('book3', './assets/book3.png');
        this.load.image('book4', './assets/book4.png');
        this.load.image('background', './assets/background.png');

        // load spritesheet
        this.load.spritesheet('explosion1', './assets/book1Explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/book2Explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion3', './assets/book3Explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion4', './assets/book4Explosion.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 9});
      }

    create() {
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x54302b).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x220a07).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x220a07).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x220a07).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x220a07).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 7, 'magic').setOrigin(0.5, 0);
        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'book1', 0, 30, 1).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'book2', 0, 20, 2).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'book3', 0, 10, 3).setOrigin(0,0);

        // tiny spaceship
        this.ship04 = new FasterSpaceship(this, game.config.width - borderUISize*3, borderUISize*7 + borderPadding*6, 'book4', 0, 60, 4).setOrigin(0,0);
    
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode1',
            frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode3',
            frames: this.anims.generateFrameNumbers('explosion3', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode4',
            frames: this.anims.generateFrameNumbers('explosion4', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#315c2b',
            color: '#220a07',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#315c2b',
            color: '#220a07',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.clockRight = this.add.text(game.config.width - (100 + borderUISize + borderPadding), borderUISize + borderPadding*2, 0, clockConfig);
    
        // GAME OVER flag
        this.gameOver = false;
        // clock
        this.timeRemaining = game.settings.gameTimer;

        this.clock = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeRemaining -= 1000;
            },
            callbackScope: this,
            loop: true
        });      
    }

    update() {
        //update time
        if(!(this.timeRemaining < 0)){
            this.clockRight.text = this.timeRemaining/1000;
        }
        // gameOver score
        let gameOverConfig = {
            fontFamily: 'Papyrus',
            fontSize: '24px',
            backgroundColor: '#315c2b',
            color: '#220a07',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        if(this.timeRemaining == 0){
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or (←) for Menu", gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        
        // check key input for restart or menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scrolling background
        this.background.tilePositionX -= 1;

        if (!this.gameOver) {     
            // update rocket
            this.p1Rocket.update();

            // update spaceships (x3)
            this.ship01.update();               
            this.ship02.update();
            this.ship03.update();
            
            this.ship04.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);   
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
                rocket.x + rocket.width > ship.x && 
                rocket.y < ship.y + ship.height &&
                rocket.height + rocket.y > ship. y){
            return true;
        } else {
            return false;
        }
    }


    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // play explode animation
        boom.anims.play('explode'+ ship.num);
        // callback after anim completes            
        boom.on('animationcomplete', () => {
            // reset ship position 
            ship.reset();
            // make ship visible again                     
            ship.alpha = 1;   
            // remove explosion sprite                    
            boom.destroy();                       
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.timeRemaining += ship.points * 100;
        this.scoreLeft.text = this.p1Score;
        
        //sound effect
        this.sound.play('sfx_explosion');
    }
}