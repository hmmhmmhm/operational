import * as Interface from '../interface'
import * as SerializedOperational from '../diff/serialized'
import { type } from 'os'

export interface IRecord<T> {
    undo: (diff?: T) => boolean
    redo: (diff?: T) => boolean
    startRecording: (limit?: number) => void
    stopRecording: () => void
    isRecording: () => boolean
    loadRecords: (previouslyRecords?: T[]) => Promise<boolean>
    saveRecords: () => Promise<boolean>
    getRecords: () => string[] | undefined
    clearRecords: () => void
}

export interface IRecordOption<T, StoreType> {
    store: Interface.Writable<StoreType>
    load?: () => Promise<T[]>
    save?: (records: T[]) => Promise<boolean>
}

export class Record<StoreType> implements IRecord<string> {
    public option: IRecordOption<string, StoreType>
    protected records: string[] = []
    protected stopRecorder?: Interface.Unsubscriber
    protected beforeStoreValue: any

    constructor(option: IRecordOption<string, StoreType>) {
        this.option = option
    }

    undo(diff?: string) {

        const storeValue = this.option.store.get()
        if (!storeValue) return false

        if (!this.isRecording()) return false
        if (!diff) {
            const recordDiff = this.records.pop()
            if (!recordDiff) return false

            try {
                const undoApplied =
                    SerializedOperational.unpatch(
                        storeValue,
                        recordDiff
                    )

                // @ts-ignore
                undoApplied.____ignoreRecordByOperational = true
                this.option.store.set(undoApplied)
            } catch (e) {
                return false
            }
        }
        return true
    }
    redo(diff: string) {
        //
    }
    isCanUndo() {
        //
    }
    isCanRedo() {
        //
    }

    startRecording(limit?: number) {
        this.stopRecording()
        this.stopRecorder =
            this.option.store.subscribe((changedStoreValue) => {
                if (typeof changedStoreValue['____ignoreRecordByOperational'] != 'undefined') return
                if (!this.beforeStoreValue) {
                    this.beforeStoreValue = changedStoreValue
                    return
                }
                try {
                    const diff = SerializedOperational.diff(
                        this.beforeStoreValue,
                        changedStoreValue
                    )
                    if (!diff) return
                    this.records.push(diff)
                } catch (e) {
                    return
                }
            })
    }
    stopRecording() {
        if (this.stopRecorder != undefined) {
            this.stopRecorder()
            this.stopRecorder = undefined
        }
    }
    isRecording() {
        return this.stopRecorder != undefined
    }
    async loadRecords(previouslyRecords?: string[]) {
        if (!previouslyRecords) {
            if (!this.option.load) return false
            try {
                const loadedRecords = await this.option.load()
                if (!loadedRecords) return false
                this.records = loadedRecords
                return true
            } catch (e) {
                return false
            }
        } else {
            this.records = previouslyRecords
        }
        return true
    }
    async saveRecords() {
        if (!this.option.save) return false
        try {
            return await this.option.save(this.records)
        } catch (e) {
            return false
        }
    }
    getRecords() {
        return this.records
    }
    clearRecords() {
        //
    }
}
