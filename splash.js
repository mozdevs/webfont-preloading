'use strict';

var PreloaderScene = {
    preload: function () {
        this.game.add.text(300, 150, 'Loading', {
            font: '60px "Amatica SC"',
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

        let fancyStyle = { font: '30px "Amatica SC"', fill: '#fff'};
        this.game.add.text(
            this.game.world.width / 2,
            this.game.world.height,
            'Duelo a Garrotazos – Goya',
            fancyStyle
        ).anchor.setTo(0.5, 1);
    }
};

function startGame() {
    let game = new Phaser.Game(625, 300, Phaser.AUTO, 'game');
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', GameScene);

    game.state.start('preloader');
}

window.onload = function () {
    document.getElementById('start').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('overlay').style.display = 'none';
        startGame();
    });
};
