"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var writable_1 = require("./writable");
var SerializedOperational = __importStar(require("../diff/serialized"));
var Utils = __importStar(require("../utils"));
var Diffable = /** @class */ (function (_super) {
    __extends(Diffable, _super);
    function Diffable(value, start) {
        if (start === void 0) { start = Utils.noop; }
        return _super.call(this, value, start) || this;
    }
    Diffable.prototype.diff = function (changedValue) {
        return SerializedOperational.diff(this.value, changedValue);
    };
    Diffable.prototype.update = function (callback) {
        var changedValue = callback(this.value);
        this.set(changedValue);
        return SerializedOperational.diff(this.value, changedValue);
    };
    return Diffable;
}(writable_1.Writable));
exports.Diffable = Diffable;
