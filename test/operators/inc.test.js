import test from 'ava'
import nanomute from '../../index.js'

test('increment value by 1 by default', t => {
    const state = nanomute({foo: 1}, 'inc(foo)')
    t.is(state.foo, 2)
})

test('increment value by positive value', t => {
    const state = nanomute({foo: 1}, 'inc(foo, 2)')
    t.is(state.foo, 3)
})

test('increment value by negative value (decrement)', t => {
    const state = nanomute({foo: 1}, 'inc(foo, -2)')
    t.is(state.foo, -1)
})

test('handle state variable not being integer (do nothing)', t => {
    const state = nanomute({foo: 'bar'}, 'inc(foo, -2)')
    t.is(state.foo, 'bar')
})

test('handle param not being integer (do nothing)', t => {
    const state = nanomute({foo: 1}, 'inc(foo, bar)')
    t.is(state.foo, 1)
})