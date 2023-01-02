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
var Thief = /** @class */ (function (_super) {
    __extends(Thief, _super);
    function Thief() {
        var _this = _super.call(this) || this;
        _this.name = 'Thief';
        return _this;
    }
    return Thief;
}(personage_1["default"]));
exports["default"] = Thief;
