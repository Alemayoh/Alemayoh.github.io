(function() {
    "use strict";

    //first function constructor
    function Bicycle() {
        this.speed = 0;
    }
    Bicycle.prototype.applyBrake = function(decreament) {
        this.speed -= decreament;
    };
    Bicycle.prototype.speedUp = function(increament) {
        this.speed += increament;
    };
    // second function constructor
    function MountainBicycle() {
        Bicycle.call(this);
        this.gear = 1;
    }
    // Here below shows the inheritance
    MountainBicycle.prototype = Object.create(Bicycle.prototype);
    MountainBicycle.prototype.constructor = MountainBicycle;

    MountainBicycle.prototype.setGear = function(gear) {
        this.gear = gear;
    };

    var start = function() {
        var bike = new Bicycle();
        console.log(bike);
        var mountainBike = new MountainBicycle();
        console.log(mountainBike);
        mountainBike.speedUp(5);
        mountainBike.setGear(4);
        console.log(mountainBike.speed);
        console.log(mountainBike.gear);
        console.log(mountainBike instanceof MountainBicycle);
        console.log(mountainBike instanceof Bicycle);
        console.log(bike.constructor);
        console.log(mountainBike.constructor);
    };
    start();
})();