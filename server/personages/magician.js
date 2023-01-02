"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var personage_1 = require("./personage");
var Magician = /** @class */ (function (_super) {
    __extends(Magician, _super);
    function Magician() {
        var _this = _super.call(this) || this;
        _this.name = 'Magician';
        return _this;
    }
    return Magician;
}(personage_1["default"]));
exports["default"] = Magician;
