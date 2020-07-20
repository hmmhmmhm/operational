export interface ISnapshotOption {
    old: any;
    new: any;
}
export declare const snapshot: (option: ISnapshotOption) => import("jsondiffpatch").Delta | undefined;
export declare const originTest: () => Promise<void>;
