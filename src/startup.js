define(['paper', 'lodash', 'explosion', 'missile'], function(paper, _, Explosion, Missile) {
    'use strict';

    var setup = function() {
        var sprites = [];
        var mousePosition = new paper.Point(0, 400);
        var tool = new paper.Tool();

        var createBomb = function() {

            var create = Math.random();
            console.log(create);

            if(create > 0.02) return;

            var x = Math.random() * 600;
            var tx = 200 + Math.random() * 200;

            var bomb = new Missile(new paper.Point(x, 0), new paper.Point(tx, 400), 'FOE');
            sprites.push(bomb);                
         };

        var game = {
            points: 0,
            shield: 10
        };

        tool.onMouseMove = function(event) {
            mousePosition = event.point;
        };
        tool.onMouseDown = function(event) {
            console.log("mousedown");
            game.points -= 1;
            sprites.push(new Missile(new paper.Point(300, 400), event.point, 'FRIEND'));
        };
        paper.view.onFrame = function(event) {

            if(game.shield > 0) {
                createBomb();
                _.each(sprites, function(item) {
                    if(item.constructor == Explosion) {
                        _.each(sprites, function(item2) {
                            if(item2.constructor == Missile && item2.fof == 'FOE') {
                                if(item2.position.getDistance(item.position) < item.explosionRadius) {
                                    item2.finished = true;
                                    game.points += 10;
                                }
                            }
                        });
                    }
                });

                _.each(sprites, function(item) {
                    item.draw(sprites, game);
                });
                sprites = _.partition(sprites, function(item) {
                    return item.finished;
                })[1];
            } else {
                var gameOver = new paper.PointText(new paper.Point(300,200));
                gameOver.justification='center';
                gameOver.fillColor = 'red';
                gameOver.fontSize = 32;
                gameOver.content = 'GAME OVER';
            }

            document.getElementById('points').innerHTML = game.points;
            document.getElementById('shield').innerHTML = game.shield;
        };
    };
    //setup the Paper.js env
    var canvas = document.getElementById('stage');
    var scope = paper.setup(canvas);
    setup();
});