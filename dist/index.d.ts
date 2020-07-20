import * as _Operational from './plain';
import * as _SerializedOperational from './serialized';
/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in object form.
 */
declare const Operational: typeof _Operational;
/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in string form.
 */
declare const SerializedOperational: typeof _SerializedOperational;
export { Operational, SerializedOperational, };
