import * as JSONDiffPatch from 'jsondiffpatch'
import {
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
} from './objects'

export interface ISnapshotOption {
    old: any
    new: any
}

export const snapshot = (option: ISnapshotOption) => {
    return JSONDiffPatch.diff(option.old, option.new)
}

export const originTest = async () => {
    const diff1 = snapshot({
        old: v1,
        new: v2,
    })
    console.log('DIFF v1->v2', diff1)
    const diff2 = snapshot({
        old: v2,
        new: v3,
    })
    console.log('DIFF v2->v3', diff2)
    const diff3 = snapshot({
        old: v3,
        new: v4,
    })
    console.log('DIFF v3->v4', diff3)
    const diff4 = snapshot({
        old: v4,
        new: v5,
    })
    console.log('DIFF v4->v5', diff4)
    const diff5 = snapshot({
        old: v5,
        new: v6,
    })
    console.log('DIFF v5->v6', diff5)
}