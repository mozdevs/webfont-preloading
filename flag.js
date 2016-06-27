'use strict';

var wasFontLoaded = false;
var wasGameLoaded = false;

function createText(game) {
    if (!wasFontLoaded || !wasGameLoaded) return;

    var fancyStyle = { font: '30px "Amatica SC"', fill: '#fff'};
    game.add.text(
        game.world.width / 2,
        game.world.height,
        'Duelo a Garrotazos – Goya',
        fancyStyle
    ).anchor.setTo(0.5, 1);
}

var PreloaderScene = {
    preload: function () {
        var font = new FontFaceObserver('Amatica SC');
        font.load().then(function () {
            wasFontLoaded = true;
            createText();
        }, function () {
            console.log('Error loading font');
        });

        this.game.add.text(300, 150, 'Loading', {
            font: '60px monospace',
            fill: '#fff',
        }).anchor.setTo(0.5);

        this.game.load.image('background', 'background.png');
    },
    create: function () {
        this.game.state.start('play');
    }
};

var GameScene = {
    create: function () {
        this.game.add.image(0, 0, 'background');
        wasGameLoaded = true;
        createText(this.game);
    }
};

window.onload = function () {
    var game = new Phaser.Game(625, 300, Phaser.AUTO, 'game');
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', GameScene);

    game.state.start('preloader');
};
