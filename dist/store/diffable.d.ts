import * as Interface from '../interface';
import { Writable } from './writable';
export declare class Diffable<T> extends Writable<T> {
    constructor(value?: T, start?: Interface.StartStopNotifier<T>);
    diff(changedValue: T): string | undefined;
    update(callback: Interface.Updater<T>): string | undefined;
}
