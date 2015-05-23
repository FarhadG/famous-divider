module.exports = {
    multiplyTransforms: function() {
        var result = arguments[0];
        for(var i = 1; i < arguments.length; i++) {
            result = Transform.multiply(result, arguments[i]);
        }
        return result;
    };
};
