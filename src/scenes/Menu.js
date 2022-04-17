class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        // load background
        this.load.image('background', './assets/background.png');
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // add menu text
        let menuConfig = {
            fontFamily: 'Papyrus',
            fontSize: '26px',
            backgroundColor: '#315c2b',
            color: '#220a07',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
            "BOOK PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Press Enter to Continue", 
            menuConfig).setOrigin(0.5);
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.start = true;
    }


    update() {
        if (!this.start && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (!this.start && Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.start = false;

            let menuConfig = {
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
            this.add.text(game.config.width/2, game.config.height/2, "Use (←)(→) arrows to move & (F) to fire", 
                menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2  + borderUISize + borderPadding, 
                "Press (←) for Novice and (→) for Expert", menuConfig).setOrigin(0.5);
        }
    }
}