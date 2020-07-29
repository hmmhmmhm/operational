// import * as Automerge from 'automerge'
import { Store } from '../'

export const recordableTest = async () => {
    const playerStore = Store.recordable<any>({
        x: 0,
        y: 0,
        z: 0,
        name: 'Player 1',
    })
    console.log('\ncurrent store value:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())

    playerStore.update((beforeValue) => {
        beforeValue.x += 20
        return beforeValue
    })

    console.log('changed store value:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    playerStore.undo()
    console.log('undo store value:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
}