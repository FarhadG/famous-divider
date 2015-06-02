/*
 *  Dependencies
 */
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Modifier = require('famous/core/Modifier');
var RenderNode = require('famous/core/RenderNode');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Easing = require('famous/transitions/Easing');


/*
 *  Constructor
 */
function Ad() {
    View.apply(this, arguments);
    _initSampleAd.call(this);
}

Ad.prototype = Object.create(View.prototype);
Ad.prototype.constructor = Ad;
Ad.DEFAULT_OPTIONS = {};


/*
 *  Sample ad
 */
function _initSampleAd() {

    var background = new ImageSurface({
        content: './images/McKinsey_%26_Company_logo.jpg',
        properties: {
            backgroundSize: 'cover'
        }
    });

    this.add(background);

    var circle = new Surface({
        size: [100, 100],
        properties: {
            background: 'white',
            borderRadius: '50%'
        }
    });

    /*
     *  A circle that goes back and forth based on the window's height
     *  using the sin function
     */
    var circleModifier = new Modifier({
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
            var diff = Date.now() * 0.002;
            var yTranslation = this.options.transitionables.yTranslation.get();
            var xTranslation = this.options.transitionables.xTranslation.get();
            return Transform.translate(Math.cos(diff) * 1150, Math.sin(diff) * 500, 0);
        }.bind(this)
    });

    this.add(circleModifier).add(circle);
}

module.exports = Ad;
