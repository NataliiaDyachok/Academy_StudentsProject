"use strict";
exports.__esModule = true;
var soldier_1 = require("./soldier");
var thief_1 = require("./thief");
var magician_1 = require("./magician");
var enums_1 = require("./enums");
var Creator = /** @class */ (function () {
    function Creator() {
    }
    Creator.createObject = function (someProperty) {
        if (someProperty === enums_1["default"].MAGICIAN) {
            return new magician_1["default"]();
        }
        else if (someProperty === enums_1["default"].THIEF) {
            return new thief_1["default"]();
        }
        else {
            return new soldier_1["default"]();
        }
    };
    return Creator;
}());
exports["default"] = Creator;
