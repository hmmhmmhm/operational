import { originTest } from './1-origin'
import { moduleTest } from './2-module'

export const test = async () => {
    console.log('\n---------------- TEST1 ----------------')
    await originTest()
    console.log('\n---------------- TEST2 ----------------')
    await moduleTest()
}

if (process.argv[1] == __filename) test()