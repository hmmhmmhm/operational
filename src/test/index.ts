import { originTest } from './1-origin'
import { moduleTest } from './2-module'
import { mergeTest } from './3-merge'
import { recordableTest } from './4-recordable'

export const test = async () => {
    console.log('\n---------------- TEST1 ----------------')
    await originTest()
    console.log('\n---------------- TEST2 ----------------')
    await moduleTest()
    console.log('\n---------------- TEST3 ----------------')
    await mergeTest()
    console.log('\n---------------- TEST4 ----------------')
    await recordableTest()
}

if (process.argv[1] == __filename) test()