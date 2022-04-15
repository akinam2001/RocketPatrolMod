/**
 * Name: Anika Mahajan
 * 
 * Project: Rocket Patrol Mods
 * 
 * Date: 04/18/2022
 * 
 * Time Taken: 2.5 hrs 
 * 
 * Points Breakdown:
 * Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
 * Allow the player to control the Rocket after it's fired (5)
 * Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
 * Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
 * Display the time remaining (in seconds) on the screen (10)
 */


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
