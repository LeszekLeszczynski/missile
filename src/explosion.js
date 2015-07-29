define(['paper'], function(paper) {
    var EXPLOSION_RADIUS = 30,
        EXPLOSION_DURATION = 40;
    var Explosion = function(position) {
        this.position = position;
        this.explosionRadius = 0;
        this.duration = 0;
    }
    Explosion.prototype.draw = function() {
        if (this.explosionRadius < EXPLOSION_RADIUS) {
            this.explosionRadius += 1;
        }
        this.duration += 1;
        if (this.duration > EXPLOSION_DURATION) {
            this.finished = true;
        }
        if (this.path != null) this.path.remove();
        if (!this.finished) {
            this.path = new paper.Path.Circle({
                center: this.position,
                radius: this.explosionRadius,
                fillColor: 'red'
            });
        }
    }
    return Explosion;
});