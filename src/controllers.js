/*
 *  Dependencies
 */
var Transitionable = require('famous/transitions/Transitionable');


/*
 *  An object containing all elements' transitionables. In order
 *  for the flipper to work, you should have a transitionable for every
 *  element that is not-static
 */
var transitionables = {
    yTranslation: new Transitionable(0),
    xTranslation: new Transitionable(0)
};


/*
 *  An animations object displaying the various animations
 *  that can range from macros animations (starting) to micro animations.
 */
var animations = {
    start: function() {
        transitionables.yTranslation.set(window.innerHeight, {
            duration: 2000
        });
        transitionables.xTranslation.set(window.innerWidth, {
            duration: 2000
        });
    }
};


/*
 *  Export an object that saves reference to the transitionables
 *  and animations for controlling the state of the apps
 */
module.exports = {
    transitionables: transitionables,
    animations: animations
};
