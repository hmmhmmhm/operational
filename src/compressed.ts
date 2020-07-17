import CBOR from 'cbor'
import * as PlainOperational from './plain'
import * as JSONDiffPatch from 'jsondiffpatch'

/**
 * 
 * @param left any
 * @param right any
 */
export const diff = (left: any, right: any) => {
    const _diff = PlainOperational.diff(left, right)
    if (!_diff) return _diff

    try {
        const cborEncoded: Buffer = CBOR.encode(_diff)
        const compressed = cborEncoded.toString('base64')
        if (!compressed) throw new Error()

        return compressed
    } catch (e) {
        return undefined
    }
}

export const diffs = (object: any[]) => {
    const diffs: string[] = []
    for (let i = 0; i < (object.length - 1); i++) {
        const left = object[i]
        const right = object[i + 1]
        const diffObject = diff(left, right)
        if (diffObject) diffs.push(diffObject)
    }
    return diffs
}

/**
 * 
 * @param delta 
 * @param original 
 * @returns It returns JSON PATCH (RFC 6902)
 */
export const changelog = (diff: string, original: any) => {
    try {
        const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
        return PlainOperational.changelog(_diff, original)
    } catch (e) {
        return undefined
    }
}

export interface IChangelogsFormattedOption {
    diff: string
    original: any
    format: 'console' | 'annotated' | 'html'
}

/**
 * 
 * @param option
 * @returns string
 */
export const changelogsFormatted = (option: IChangelogsFormattedOption) => {
    try {
        const diff: JSONDiffPatch.Delta = CBOR.decode(option.diff)
        return PlainOperational.changelogFormatted({
            diff,
            format: option.format,
            original: option.original,
        })
    } catch (e) {
        return undefined
    }
}

export const patch = (left: any, diff: string) => {
    try {
        const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
        return JSONDiffPatch.patch(left, _diff)
    } catch (e) {
        return undefined
    }
}

export const patches = (object: any, diffs: string[]) => {
    let patched: any = object
    try {
        for (let diff of diffs) {
            const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
            patched = JSONDiffPatch.patch(patched, _diff)
        }
    } catch (e) {
        return undefined
    }
    return patched
}

export const unpatch = (right: any, diff: string) => {
    const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
    return JSONDiffPatch.unpatch(right, _diff)
}

export const unpatches = (object: any, diffs: string[]) => {
    let patched: any = undefined
    try {
        for (let diff of diffs) {
            const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
            patched = JSONDiffPatch.unpatch(patched, _diff)
        }
    } catch (e) { }
    return patched
}

export const reverse = (diff) => {
    try {
        const _diff: JSONDiffPatch.Delta = CBOR.decode(diff)
        return JSONDiffPatch.reverse(_diff)
    } catch (e) {
        return undefined
    }
}