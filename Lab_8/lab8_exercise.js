(function() {
    "use strict";

    var init = function() {
        document.getElementById("start").onclick = start;
    };
    var createBicyclePrototye = function() {
        return {
            speed: 0,
            applyBrake: function(decreament) {
                this.speed -= decreament;
            },
            speedUp: function(increament) {
                this.speed += increament;
            }
        };
    };
    const createMountainBikeProtoype = function(proto_type) {

        var bikeObj = Object.create(proto_type);
        bikeObj.gear = 1; //own property
        bikeObj.setGear = function(newValue) { //mountain bike method
            this.gear = newValue;
        };
        return bikeObj;
    };

    var bicyclePrototype, mountainBikePrototype;

    var start = function() {
        bicyclePrototype = createBicyclePrototye();
        mountainBikePrototype = createMountainBikeProtoype(bicyclePrototype);

        console.log(bicyclePrototype.speed);
        console.log(mountainBikePrototype.speed);

        bicyclePrototype.speedUp(10);

        console.log(bicyclePrototype.speed);
        console.log(mountainBikePrototype.speed);
        console.log(mountainBikePrototype.hasOwnProperty('speed'));

        bicyclePrototype.speedUp(10);

        console.log(mountainBikePrototype.speed);
        console.log(mountainBikePrototype.speed);
        console.log(mountainBikePrototype.hasOwnProperty('speed'));

    };
    window.onload = init;
})();