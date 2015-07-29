define(['paper', 'lodash', 'explosion', 'missile'], function(paper, _, Explosion, Missile) {
    'use strict';
    var setup = function() {
        var sprites = [];
        var mousePosition = new paper.Point(0, 400);
        var tool = new paper.Tool();
        tool.onMouseMove = function(event) {
            mousePosition = event.point;
        }
        tool.onMouseDown = function(event) {
            console.log("mousedown");
            sprites.push(new Missile(event.point));
        };
        paper.view.onFrame = function(event) {
            _.each(sprites, function(item) {
                item.draw(sprites);
            });
            sprites = _.partition(sprites, function(item) {
                return item.finished;
            })[1];
        };
    }
    //setup the Paper.js env
    var canvas = document.getElementById('stage');
    var scope = paper.setup(canvas);
    setup();
});