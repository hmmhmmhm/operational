import * as Interface from '../interface';
export interface IRecord<T> {
    undo: (diff?: T) => void;
    redo: (diff?: T) => void;
    startRecording: (limit?: number) => void;
    stopRecording: () => void;
    isRecording: () => boolean;
    loadRecords: (previouslyRecords?: T[]) => Promise<boolean>;
    saveRecords: () => Promise<boolean>;
    getRecords: () => string[] | undefined;
    clearRecords: () => void;
}
export interface IRecordOption<T, StoreType> {
    store: Interface.Readable<StoreType>;
    load?: () => Promise<T[]>;
    save?: (records: T[]) => Promise<boolean>;
}
export declare class Record<StoreType> implements IRecord<string> {
    protected records: string[];
    protected option: IRecordOption<string, StoreType>;
    protected stopRecorder?: Interface.Unsubscriber;
    constructor(option: IRecordOption<string, StoreType>);
    undo(diff?: string): void;
    redo(diff: string): void;
    isCanUndo(): void;
    isCanRedo(): void;
    startRecording(limit?: number): void;
    stopRecording(): void;
    isRecording(): boolean;
    loadRecords(previouslyRecords?: string[]): Promise<boolean>;
    saveRecords(): Promise<boolean>;
    getRecords(): string[];
    clearRecords(): void;
}
