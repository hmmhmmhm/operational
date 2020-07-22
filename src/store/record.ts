import * as Interface from '../interface'
import * as SerializedOperational from '../diff/serialized'

export interface IRecord<T> {
    undo: (diff?: T) => void
    redo: (diff?: T) => void
    startRecording: (limit?: number) => void
    stopRecording: () => void
    isRecording: () => boolean
    loadRecords: (previouslyRecords?: T[]) => Promise<boolean>
    saveRecords: () => Promise<boolean>
    getRecords: () => string[] | undefined
    clearRecords: () => void
}

export interface IRecordOption<T, StoreType> {
    store: Interface.Readable<StoreType>
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
        // 
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
                if (!this.beforeStoreValue) {
                    this.beforeStoreValue = changedStoreValue
                    return
                }
                try {
                    const diff = SerializedOperational.diff(
                        this.beforeStoreValue,
                        changedStoreValue
                    )
                } catch (e) {
                    return
                }
            })
    }
    stopRecording() {
        // return records
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
