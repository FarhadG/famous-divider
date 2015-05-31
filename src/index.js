/*
 *  Dependencies
 */
require('./styles');
require('famous-polyfills');
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Transitionable = require('famous/transitions/Transitionable');
var multiplyTransforms = require('./helpers').multiplyTransforms;
var Divider = require('./Divider');
var SampleAd = require('./SampleAd');
var controllers = require('./controllers');


/*
 *  Create the context
 */
var context = Engine.createContext();
context.setPerspective(1000);


/*
 *  A flipper class that has two container surfaces
 *  with transitionables passed down into both and
 *  some other basic options
 */
var divider = new Divider({
    app: SampleAd,
    appWidth: window.innerWidth,
    appHeight: window.innerHeight,
    transitionables: controllers.transitionables,
    // Number of rows and columns to divide your app
    column: 5,
    row: 5,
    // Debugger view for showing the divides cutout
    debug: true,
    // Sample modifier showing the power of the divider
    badass: true
});


/**
 * Sample modifier for spinning the node's below in the subtree
 */
var spinningModifier = new Modifier({
    transform: function() {
        return multiplyTransforms(
            Transform.rotateX(Math.sin(Date.now() * 0.0001) * 0.3),
            Transform.rotateY(Math.sin(Date.now() * 0.0009) * 0.3),
            Transform.rotateZ(Math.sin(Date.now() * 0.0006) * 0.3)
        );
    }
});

/**
 * Add divider to the scene with the sample spinning modifier
 */
context.add(spinningModifier).add(divider);


