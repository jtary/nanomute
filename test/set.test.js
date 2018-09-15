import test from 'ava'
import nanomute from '../index.js'

test('sets an integer value on state', t => {
    const state = nanomute({}, 'set(alpha, 2)')
    t.deepEqual(state.alpha, 2)
})

test('sets a string value on state', t => {
    const state = nanomute({}, 'set(alpha, two)')
    t.deepEqual(state.alpha, 'two')
})

test('sets a boolean value on state', t => {
    const state = nanomute({}, 'set(alpha, true)')
    t.deepEqual(state.alpha, true)
})

test('doesn\'t modify original state', t => {
    const origState = {}
    nanomute(origState, 'set(alpha, two)')
    t.deepEqual(origState, {})
})