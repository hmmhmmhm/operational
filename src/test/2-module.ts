import { Operational } from '../'
import {
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
} from './objects'

export const moduleTest = async () => {
    const diffs = Operational.diffs([
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
    ])
    console.log('\ndiffs ->', diffs)

    const changelogs = Operational.changelogs(diffs[0], v1)
    console.log('\nchangelogs ->', changelogs)

    const changelogsFormatted = Operational.changelogFormatted({
        diff: diffs[0],
        original: v1,
        format: 'html'
    })
    console.log('\nchangelogsFormatted ->\n', changelogsFormatted)

    const patched = Operational.patch(v1, diffs[0])
    console.log('\nsingle patched', patched)

    const multiplePatched = Operational.patches(v1, diffs)
    console.log('\nmultiple patched', multiplePatched)

    console.log('\ndiffs', JSON.stringify(diffs, null, 4))
}