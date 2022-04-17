// Smaller, Faster Spaceship prefab
class FasterSpaceship extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue, num) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene, display list, update list
      scene.add.existing(this);
      // store pointValue
      this.points = pointValue;
      // pixels per frame
      this.moveSpeed = game.settings.spaceshipSpeed + 2;
      // num of spaceship
      this.num = num;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    // reset position
    reset() {
        this.x = game.config.width;
    }
}