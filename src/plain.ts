import * as JSONDiffPatch from 'jsondiffpatch'

/**
 * 
 * @param left any
 * @param right any
 */
export const diff = (left: any, right: any) => {
    return JSONDiffPatch.diff(left, right)
}

export const diffs = (object: any[]) => {
    const diffs: JSONDiffPatch.Delta[] = []
    for (let i = 0; i < (object.length - 1); i++) {
        const left = object[i]
        const right = object[i + 1]
        const diffObject = JSONDiffPatch.diff(left, right)
        if (diffObject) diffs.push(diffObject)
    }
    return diffs
}

export interface IChangeLog {
    op: 'add' | 'remove' | 'replace' | 'move'
    path: string
    value: any
}

/**
 * 
 * @param delta 
 * @param original 
 * @returns It returns JSON PATCH (RFC 6902)
 */
export const changelog = (diff: JSONDiffPatch.Delta, original: any) => {
    try {
        // @ts-ignore
        const result: IChangeLog[] = JSONDiffPatch.formatters.jsonpatch.format(diff, original)
        if (!result) throw new Error()
        return result
    } catch (e) {
        return undefined
    }
}

export interface IChangelogsFormattedOption {
    diff: JSONDiffPatch.Delta
    original: any
    format: 'console' | 'annotated' | 'html'
}

/**
 * 
 * @param option
 * @returns string
 */
export const changelogFormatted = (option: IChangelogsFormattedOption) => {
    let result: string | undefined = undefined
    try {
        switch (option.format) {
            case 'annotated':
                result = JSONDiffPatch.formatters.annotated.format(option.diff, option.original)
                break
            case 'console':
                result = JSONDiffPatch.formatters.console.format(option.diff, option.original)
                break
            case 'html':
                result = JSONDiffPatch.formatters.html.format(option.diff, option.original)
                break
        }
    } catch (e) { }
    return result
}

export const patch = (left: any, diff: JSONDiffPatch.Delta) => {
    return JSONDiffPatch.patch(left, diff)
}

export const patches = (object: any, diffs: JSONDiffPatch.Delta[]) => {
    let patched: any = object
    try {
        for (let diff of diffs)
            patched = JSONDiffPatch.patch(patched, diff)
    } catch (e) {
        return undefined
    }
    return patched
}

export const unpatch = (right: any, diff: JSONDiffPatch.Delta) => {
    return JSONDiffPatch.unpatch(right, diff)
}

export const unpatches = (object: any, diffs: JSONDiffPatch.Delta[]) => {
    let patched: any = undefined
    try {
        for (let diff of diffs)
            patched = JSONDiffPatch.unpatch(patched, diff)
    } catch (e) {
        return undefined
    }
    return patched
}

export const reverse = (diff) => {
    return JSONDiffPatch.reverse(diff)
}