import { Store } from '../'

export const recordableTest = async () => {
    const playerStore = Store.recordable<any>({
        x: 0,
        y: 0,
        z: 0,
        name: 'Player 1',
    })

    // * Single Undo and Redo
    console.log('\ninit player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())

    playerStore.update((value) => {
        value.x += 20
        return value
    })

    console.log('\nchanged player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())


    playerStore.undo()
    console.log('\nundo applied player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())

    playerStore.redo()
    console.log('\nredo applied player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())

    playerStore.undo()
    console.log('\nundo applied player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())

    playerStore.redo()
    console.log('\nredo applied player store:', playerStore.get())
    console.log('is can undo', playerStore.isCanUndo())
    console.log('is can redo', playerStore.isCanRedo())


    // * Multiple Undo and Redo
    const roomStore = Store.recordable<any>({
        room1: [],
        room2: [],
    })
    console.log('\n\ninit room store', roomStore.get())
    console.log('is can undo', roomStore.isCanUndo())
    console.log('is can redo', roomStore.isCanRedo())

    roomStore.update(value => {
        value.room1.push({
            name: 'User1',
            age: 20,
        })
        return value
    })
    roomStore.update((value) => {
        value.room2.push({
            name: 'User2',
            age: 30,
        })
        return value
    })
    roomStore.update((value) => {
        value.room2.push({
            name: 'User3',
            age: 40,
        })
        return value
    })
    console.log('\nmultiple update of room store', roomStore.get())
    console.log('is can undo', roomStore.isCanUndo())
    console.log('is can redo', roomStore.isCanRedo())

    console.log('\nupdate records', roomStore.getRecords(), roomStore.getCurrentRecordIndex())

    roomStore.undo()
    console.log('\nundo(1/3) room store', roomStore.get())
    roomStore.undo()
    console.log('\nundo(2/3) room store', roomStore.get())
    roomStore.undo()
    console.log('\nundo(3/3) room store', roomStore.get())


    roomStore.redo()
    console.log('\n\nredo(1/3) room store', roomStore.get())
    roomStore.redo()
    console.log('\nredo(2/3) room store', roomStore.get())
    roomStore.redo()
    console.log('\nredo(3/3) room store', roomStore.get())

    // * Stop and restart
    roomStore.stopRecording()
    roomStore.update((value) => {
        value.room2.push({
            name: 'User4',
            age: 40,
        })
        return value
    })
    console.log('\nstopRecording test', roomStore.getRecords(), roomStore.get())

    roomStore.startRecording()
    console.log('\nre startRecording test', roomStore.getRecords(), roomStore.get())

    // * Save and Load
    const recordData = await roomStore.save()
    console.log('\nsave test', recordData)
}