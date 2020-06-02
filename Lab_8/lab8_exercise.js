(function() {
    "use strict";

    var init = function() {
        document.getElementById("start").onclick = start;
    };
    var bicyclePrototype, mountainBikePrototype;
    // Question_1

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

    //Question_2
    const createMountainBikeProtoype = function(proto_type) {

        var bikeObj = Object.create(proto_type);
        bikeObj.gear = 1;
        bikeObj.setGear = function(newValue) { //mountain bike method
            this.gear = newValue;
        };
        return bikeObj;
    };

    //Question_3
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


        var bicycle = Object.create(bicyclePrototype);
        bicycle.speed = 12;
        bicycle.speedUp = 15;
        console.log(bicycle.speed);

        var mountainBike = Object.create(mountainBikePrototype);
        mountainBike.setGear(4);
        console.log(mountainBike.gear);
    };
    window.onload = init;
})();