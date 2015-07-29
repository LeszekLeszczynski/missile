define(['paper', 'explosion'], function(paper, Explosion) {
    var MISSILE_DRAG = 0.1;
    var Missile = function(target) {
        this.position = new paper.Point(300, 400);
        this.speed = new paper.Point(0, 0);
        this.heading = new paper.Point(target.x - this.position.x, target.y - this.position.y).normalize();
        this.target = target;
    }
    Missile.prototype.draw = function(sprites) {
        this.speed = new paper.Point(this.speed.x + this.heading.x * MISSILE_DRAG, this.speed.y + this.heading.y * MISSILE_DRAG);
        this.position = new paper.Point(this.position.x + this.speed.x, this.position.y + this.speed.y);
        if (this.position.y < this.target.y) {
            sprites.push(new Explosion(this.position));
            this.finished = true;
        }
        if (this.path) {
            this.path.remove();
        }
        if (!this.finished) {
            this.path = new paper.Path.Rectangle({
                position: this.position,
                size: [5, 15],
                strokeColor: 'black'
            });
            this.path.rotate(this.heading.getAngle() - 90);
        }
    }
    return Missile;
});