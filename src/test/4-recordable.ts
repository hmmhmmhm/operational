import { Store } from '../'

export const recordableTest = async () => {
    const playerStore = Store.recordable<any>({
        x: 0,
        y: 0,
        z: 0,
        name: 'Player 1',
    })

    console.log('\ninit player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())

    playerStore.update((beforeValue) => {
        beforeValue.x += 20
        return beforeValue
    })

    console.log('\nchanged player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())


    playerStore.undo()
    console.log('\nundo applied player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())


}