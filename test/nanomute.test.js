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