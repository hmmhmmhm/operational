"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var _Operational = __importStar(require("./plain"));
var _SerializedOperational = __importStar(require("./serialized"));
/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in object form.
 */
var Operational = _Operational;
exports.Operational = Operational;
/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in string form.
 */
var SerializedOperational = _SerializedOperational;
exports.SerializedOperational = SerializedOperational;
