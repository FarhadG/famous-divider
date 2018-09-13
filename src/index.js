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
 *  The Famo.us Divider instantiation that takes is various
 *  inputs for configuring your app with
 */
var divider = new Divider({
    // Your app
    app: SampleAd,
    // Width and height for the app
    appWidth: window.innerWidth,
    appHeight: window.innerHeight,
    // Controllers that are passed down to keep your app in sync
    transitionables: controllers.transitionables,
    // Number of rows and columns to divide your app
    column: 10,
    row: 10,
    // Debugger view for showing the divides cutout
    debug: false,
    // Sample animations modifier showing the power and capabilities
    badass: true
});


/**
 * Sample modifier for spinning the node's below in the subtree
 */
var spinningModifier = new Modifier({
    transform: function() {
        return multiplyTransforms(
            Transform.rotateX(Math.sin(Date.now() * 0.0001) * 0.3),
            Transform.rotateY(Math.cos(Date.now() * 0.0009) * 0.3),
            Transform.rotateZ(Math.cos(Date.now() * 0.0006) * 0.3)
        );
    }
});

/**
 * Add divider to the scene with the sample spinning modifier
 */
context.add(spinningModifier).add(divider);


