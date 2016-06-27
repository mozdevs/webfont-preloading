'use strict';

// We create our own custom loader class extending Phaser.Loader.
// This new loader will support webfonts
function CustomLoader(game) {
    Phaser.Loader.call(this, game);
}

CustomLoader.prototype = Object.create(Phaser.Loader.prototype);
CustomLoader.prototype.constructor = CustomLoader;

// new method to load webfonts
// this follows the structure of all of the file assets loading methods
CustomLoader.prototype.webfont = function (key, fontName, overwrite) {
    if (typeof overwrite === 'undefined') { overwrite = false; }

    // here fontName will be stored in file's `url` property
    // after being added to the file list
    this.addToFileList('webfont', key, fontName);
    return this;
};

CustomLoader.prototype.loadFile = function (file) {
    Phaser.Loader.prototype.loadFile.call(this, file);

    // we need to call asyncComplete once the file has loaded
    if (file.type === 'webfont') {
        var _this = this;
        // note: file.url contains font name
        var font = new FontFaceObserver(file.url);
        font.load(null, 10000).then(function () {
            _this.asyncComplete(file);
        }, function ()  {
            _this.asyncComplete(file, 'Error loading font ' + file.url);
        });
    }
};

var PreloaderScene = {
    init: function () {
        // swap Phaser.Loader for our custom one
        this.game.load = new CustomLoader(this.game);
    },
    preload: function () {
        this.game.add.text(300, 150, 'Loading', {
            font: '60px monospace',
            fill: '#fff',
        }).anchor.setTo(0.5);

        this.game.load.webfont('fancy', 'Amatica SC');
        this.game.load.image('background', 'background.png');
    },
    create: function () {
        this.game.state.start('play');
    }
};

var GameScene = {
    create: function () {
        this.game.add.image(0, 0, 'background');

        var fancyStyle = { font: '30px "Amatica SC"', fill: '#fff'};
        this.game.add.text(
            this.game.world.width / 2,
            this.game.world.height,
            'Duelo a Garrotazos – Goya',
            fancyStyle
        ).anchor.setTo(0.5, 1);
    }
};

window.onload = function () {
    var game = new Phaser.Game(625, 300, Phaser.AUTO, 'game');
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', GameScene);

    game.state.start('preloader');
};
