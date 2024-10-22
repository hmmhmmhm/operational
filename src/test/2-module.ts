import { Diff } from '../index'
import {
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
} from './objects'

export const moduleTest = async () => {
    const diffs = Diff.Operational.diffs([
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
    ])
    console.log('\ndiffs ->', diffs)

    const changelogs = Diff.Operational.changelogs(diffs[0], v1)
    console.log('\nchangelogs ->', changelogs)

    const changelogsFormatted = Diff.Operational.changelogsFormatted({
        diff: diffs[0],
        original: v1,
        format: 'html'
    })
    console.log('\nchangelogsFormatted ->\n', changelogsFormatted)

    const patched = Diff.Operational.patch(v1, diffs[0])
    console.log('\nsingle patched', patched)

    const multiplePatched = Diff.Operational.patches(v1, diffs)
    console.log('\nmultiple patched', multiplePatched)

    // console.log('\ndiffs', JSON.stringify(diffs, null, 4))
}