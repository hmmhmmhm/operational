import * as Interface from '../interface'
import * as SerializedOperational from '../diff/serialized'
import { EventEmitter } from 'events'

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

export interface IRecordEvent {
    on(
        event: 'recordIndexChanged',
        listener: (
            currentRecordIndex: number,
            status: 'undo' | 'redo' | 'new' | 'calibrate'
        ) => void,
    ): this,

    on(
        event: 'recordsChanged',
        listener: (
            records: string[],
            status: 'new' | 'calibrate'
        ) => void,
    ): this,

    on(
        event: 'recordCleared',
        listener: (
            records: string[],
            currentRecordIndex: number,
        ) => void,
    ): this,
}

export class Record<StoreType> implements IRecord<string> {
    public option: IRecordOption<string, StoreType>
    protected records: string[] = []
    protected currentRecordIndex: number = -1
    protected stopRecorder?: Interface.Unsubscriber
    protected beforeStoreValue: any
    protected limit?: number
    protected event: EventEmitter & IRecordEvent = new EventEmitter()

    constructor(option: IRecordOption<string, StoreType>) {
        this.option = option
    }

    setWithNoRecord(value: any) {
        value.____ignoreRecordByOperational = true
        this.option.store.set(value)
    }

    undo(diff?: string) {
        if (!this.isCanUndo()) return false

        const storeValue = this.option.store.get()
        if (!storeValue) return false

        if (diff) {
            try {
                const undoApplied =
                    SerializedOperational.unpatch(
                        storeValue,
                        diff
                    )
                this.setWithNoRecord(undoApplied)
                return true
            } catch (e) {
                return false
            }
        }

        const recordDiff = this.records[--this.currentRecordIndex]
        if (!recordDiff) return false

        this.event.emit(
            'recordIndexChanged',
            this.currentRecordIndex,
            'undo'
        )

        try {
            const undoApplied =
                SerializedOperational.unpatch(
                    storeValue,
                    recordDiff
                )
            this.setWithNoRecord(undoApplied)
            return true
        } catch (e) {
            return false
        }
    }
    redo(diff: string) {
        if (!this.isCanRedo()) return false

        const storeValue = this.option.store.get()
        if (!storeValue) return false

        if (diff) {
            try {
                const redoApplied =
                    SerializedOperational.patch(
                        storeValue,
                        diff
                    )
                this.setWithNoRecord(redoApplied)
                return true
            } catch (e) {
                return false
            }
        }

        const recordDiff = this.records[++this.currentRecordIndex]
        if (!recordDiff) return false

        this.event.emit(
            'recordIndexChanged',
            this.currentRecordIndex,
            'redo'
        )

        try {
            const redoApplied =
                SerializedOperational.patch(
                    storeValue,
                    recordDiff
                )
            this.setWithNoRecord(redoApplied)
            return true
        } catch (e) {
            return false
        }
    }
    isCanUndo() {
        if (!this.isRecording()) return false
        return (this.currentRecordIndex) <= 0
    }
    isCanRedo() {
        if (!this.isRecording()) return false
        return (this.currentRecordIndex + 1) > (this.records.length - 1)
    }

    startRecording(limit?: number) {
        this.stopRecording()
        this.limit = limit
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

                    if (this.currentRecordIndex == -1) {
                        this.currentRecordIndex = 0
                    } else if (this.currentRecordIndex != this.records.length) {
                        this.records = this.records.slice(0, this.currentRecordIndex)
                        this.currentRecordIndex += 1
                    } else {
                        this.currentRecordIndex += 1
                    }
                    this.event.emit(
                        'recordIndexChanged',
                        this.currentRecordIndex,
                        'new'
                    )

                    this.records.push(diff)
                    this.event.emit(
                        'recordsChanged',
                        this.records,
                        'new'
                    )

                    if (this.limit) {
                        while (this.limit < this.records.length) {
                            this.records.pop()
                            this.event.emit(
                                'recordsChanged',
                                this.records,
                                'calibrate'
                            )
                            this.currentRecordIndex -= 1
                            this.event.emit(
                                'recordIndexChanged',
                                this.currentRecordIndex,
                                'calibrate'
                            )
                        }
                    }
                } catch (e) { }
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
    getRecord(index: number) {
        return this.records[index]
    }
    clearRecords() {
        this.records = []
        this.currentRecordIndex = -1
        this.event.emit(
            'recordCleared',
            this.records,
            this.currentRecordIndex,
        )
    }

    getEvent() {
        return this.event
    }
}