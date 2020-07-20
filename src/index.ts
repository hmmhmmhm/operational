import * as _Operational from './plain'
import * as _SerializedOperational from './serialized'
import * as Interface from './interface'
import * as Store from './store'
/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in object form.
 */
const Operational = _Operational

/**
 * @description
 * A collection of functions to manage changes in objects.
 * Changed values are tracked in string form.
 */
const SerializedOperational = _SerializedOperational

export {
    Operational,
    SerializedOperational,
    Interface,
    Store,
}