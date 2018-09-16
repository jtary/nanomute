import test from 'ava'
import nanomute from '../index.js'

test('nanomute exports', t=> {
    t.is(typeof nanomute, 'function')
})

test('empty call returns undefined', t => {
    const state = nanomute()
    t.deepEqual(state, undefined)
})

test('non-object returned as is', t => {
    const state = nanomute('string', 'string')
    t.deepEqual(state, 'string')
})

test.todo('handles logical \'and\' with is')
// test('handles logical \'and\' with is', t => {
//     t.is(nanomute({foo: true, bar: true}, 'is(foo) and is(bar)'), true)
// })

test.todo('handles logical \'or\' is true')
// test('handles logical \'or\' is true', t => {
//     t.is(nanomute({foo: true, bar: false}, 'is(foo) and is(bar)'), true)
// })