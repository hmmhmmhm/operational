import * as Interface from '../interface'
import { Writable } from './writable'
import * as SerializedOperational from '../diff/serialized'
import * as Utils from '../utils'

export class Diffable<T> extends Writable<T> {
    constructor(value?: T, start: Interface.StartStopNotifier<T> = Utils.noop) {
        super(value, start)
    }

    diff(changedValue: T) {
        return SerializedOperational.diff(this.value, changedValue)
    }

    update(callback: Interface.Updater<T>) {
        const changedValue = callback(this.value)
        this.set(changedValue)
        return SerializedOperational.diff(this.value, changedValue)
    }
    //* diff 관련 함수들
}