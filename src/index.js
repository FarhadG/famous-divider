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
var Divider = require('./Divider');
var SampleAd = require('./SampleAd');
var controllers = require('./controllers');


/*
 *  Create the context
 */
var context = Engine.createContext();
context.setPerspective(1000);

/*
 *  Helper function to multiply as many transforms together
 */
function _multiplyTransforms() {
    var result = arguments[0];
    for(var i = 1; i < arguments.length; i++) {
        result = Transform.multiply(result, arguments[i]);
    }
    return result;
}

var spinningModifier = new Modifier({
    transform: function() {
        return _multiplyTransforms(
            Transform.rotateX(Math.sin(Date.now() * 0.0001)),
            Transform.rotateY(Math.sin(Date.now() * 0.0003)),
            Transform.rotateZ(Math.sin(Date.now() * 0.0006))
        );
    }
});


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
    column: 3,
    row: 3,
    debug: true,
    badass: true
});

context.add(spinningModifier).add(divider);


