// import * as Automerge from 'automerge'
import { Store } from '../'

export const recordableTest = async () => {
    const playerStore = Store.recordable<any>({
        x: 0,
        y: 0,
        z: 0,
        name: 'Player 1',
    })

    playerStore.update((beforeValue) => {
        beforeValue.x += 20
    })

    console.log('\nchanged store value:', playerStore.get())
}