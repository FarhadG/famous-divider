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
function Divider() {
    View.apply(this, arguments);
    _initContainers.call(this);
    _initApp.call(this);
    _initDebugBackground.call(this);
}

Divider.prototype = Object.create(View.prototype);
Divider.prototype.constructor = Divider;
Divider.DEFAULT_OPTIONS = {
    row: 1,
    column: 1
};


/*
 *  A background for debugging purposes
 */
function _initDebugBackground() {
    if (!this.options.debug) return;

    this.containers.forEach(function(containerObj, i) {

        var background = new Surface({
            properties: {
                background: '#111',
                border: '1px dashed green',
                zIndex: '-9999999'
            }
        });

        containerObj.container.add(background);
    });
}


/*
 *  Helper function for getting the offset for the dividers
 */
function _getOffset(column, row) {
    return {
        x: column * this.options.appWidth / this.options.column,
        y: row * this.options.appHeight / this.options.row
    };
}


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


/*
 *  The container that all items are added into. The container surface
 *  is necessary for clipping the view into half. You can also do this by
 *  creating two div elements inside the html file, however, that would
 *  be the same overhead, since you would need to create two contexts targeting
 *  each div element and you would lose some of easy built-in functionality of
 *  what famo.us provides with container surfaces
 */
function _initContainers() {
    this.containers = [];

    for(var column = 0; column < this.options.column; column++) {
        for(var row = 0; row < this.options.row; row++) {

            var container = new ContainerSurface({
                classes: ['backfaceVisibility'],
                properties: {
                    overflow: 'hidden'
                }
            });

            var offset = _getOffset.call(this, column, row);
            var width = this.options.appWidth / this.options.column;
            var height = this.options.appHeight / this.options.row;
            var containerModifier = new Modifier({
                size: [width, height],
                transform: function(offset) {
                    if (this.options.badass) {
                        var translateZ = (offset.x + 1) * (offset.y + 1) * 0.000001 * Math.sin(Date.now() * 0.001)
                        return _multiplyTransforms(
                            Transform.translate(offset.x, offset.y, translateZ * 500 - 600),
                            Transform.rotateY(0)
                        );
                    }
                    else {
                        return Transform.translate(offset.x, offset.y, 0);
                    }
                }.bind(this, offset)
            });

            this.containers.push({
                container: container,
                modifier: containerModifier,
                offset: offset
            });

            this.add(containerModifier).add(container);
        }
    }
}


/*
 *  Iterate over each container and instantiate an app within it
 */
function _initApp() {

    this.containers.forEach(function(containerObj, i) {

        var offsetModifier = new Modifier({
            size: [this.options.appWidth, this.options.appHeight],
            transform: Transform.translate(-containerObj.offset.x, -containerObj.offset.y, 0)
        });

        var app = new this.options.app({
            transitionables: this.options.transitionables
        });

        containerObj.container.add(offsetModifier).add(app);

    }.bind(this));
}

module.exports = Divider;