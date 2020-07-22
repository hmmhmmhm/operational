// import * as Automerge from 'automerge'
import { Store } from '../'

export const mergeTest = async () => {

    const store = Store.writable({
        changed: '0'
    })

    let beforeChangedStore: any = undefined
    store.subscribe((changedStore) => {
        if (!beforeChangedStore) {
            beforeChangedStore = changedStore
            return
        }
        console.log('changedStore', beforeChangedStore, changedStore)
    })

    store.set({
        changed: '1'
    })

    //     const origin = {
    //         text: 'Hello World',
    //         user1Toggle: false,
    //         user2Toggle: false,
    //     }

    //     // * USER 1
    //     const user1Changes = {
    //         text: 'Hello My World',
    //         user1Toggle: true,
    //         user2Toggle: true,
    //     }
    //     const user1ChangeDiff = Operational.diffs([
    //         origin,
    //         user1Changes,
    //     ])

    //     // * USER 2
    //     const user2Changes = {
    //         text: 'Hello World!!!',
    //         user1Toggle: false,
    //         user2Toggle: true,
    //     }
    //     const user2ChangeDiff = Operational.diffs([
    //         origin,
    //         user2Changes,
    //     ])
    //     console.log(user1ChangeDiff)
    //     console.log(user2ChangeDiff)


    // let doc = Automerge.change<any>(, (doc: any) => {
    //     doc.text = 'Hello World'
    //     doc.birds = []
    // })
    // doc = Automerge.change(doc, (doc: any) => {
    //     doc.text = 'Hello World'
    //     doc.birds.push('blackbird')
    // })


    // doc = Automerge.change(doc, (doc: any) => {
    //     doc.birds.push('robin')
    // })

    // const origin: any = { text: 'Hello World' }

    // let doc1 = Automerge.from(origin)
    // doc1 = Automerge.change(doc1, (doc) => {
    //     doc.text = 'Hello New World'
    //     doc.user1Toggle = true
    // })

    // let doc2 = Automerge.from(origin)
    // // console.log('doc1', Automerge.save(doc1))
    // // Automerge.applyChanges()
    // Automerge.Backend.init()
    // Automerge.Frontend.
    // doc2 = Automerge.change(doc2, (doc) => {
    //     doc.text = 'Hello World!!'
    //     doc.user2Toggle = true
    // })

    // const changes = Automerge.getAllChanges(doc1)
    // // Automerge.diff()
    // // console.log(JSON.stringify(changes, null, 4))
    // let doc3 = Automerge.merge(doc1, doc2)
    // console.log(doc3)
}