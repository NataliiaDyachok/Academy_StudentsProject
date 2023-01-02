"use strict";
exports.__esModule = true;
var Personage = /** @class */ (function () {
    function Personage() {
        this.name = 'Personage';
    }
    Personage.prototype.getHealth = function () {
        return this.health;
    };
    ;
    Personage.prototype.setHealth = function (num) {
        this.health = num;
    };
    ;
    Personage.prototype.attack = function () { };
    ;
    Personage.prototype.capabilities = function () { };
    ;
    return Personage;
}());
exports["default"] = Personage;
