define(['paper', 'explosion'], function(paper, Explosion) {
    var MISSILE_DRAG = 0.1;
    var Missile = function(point, target, fof) {
        this.fof = fof;

        if(fof == 'FRIEND') {
            this.fill = 'black';
        } else {
            this.fill = 'green';
        }
        this.position = point;
        this.speed = new paper.Point(0, 0);
        this.heading = new paper.Point(target.x - this.position.x, target.y - this.position.y).normalize();
        this.target = target;
    }
    Missile.prototype.draw = function(sprites, game) {

        var drag = this.fof =='FRIEND'?0.1:0.01;

        this.speed = new paper.Point(this.speed.x + this.heading.x * drag, this.speed.y + this.heading.y * drag);
        this.position = new paper.Point(this.position.x + this.speed.x, this.position.y + this.speed.y);
        if (Math.abs(this.position.y - this.target.y) < 10) {
            if(this.fof == 'FOE') {
                game.shield -= 1;
            }
            sprites.push(new Explosion(this.position, this.fof));
            this.finished = true;
        }
        if (this.path) {
            this.path.remove();
        }
        if (!this.finished) {
            this.path = new paper.Path.Rectangle({
                position: this.position,
                size: [5, 15],
                strokeColor: 'black',
                fillColor: this.fill
            });
            this.path.rotate(this.heading.getAngle() - 90);
        }
    }

    return Missile;
});