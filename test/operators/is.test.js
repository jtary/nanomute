import test from 'ava'
import nanomute from '../../index.js'

test('can handle integer compare (match)', t => {
    const state = {alpha: 2}
    t.deepEqual(nanomute(state, 'is(alpha, 2)'), true)
})

test('can handle integer compare (not-match)', t => {
    const state = {alpha: 3}
    t.deepEqual(nanomute(state, 'is(alpha, 2)'), false)
})

test('can handle string compare (match)', t => {
    const state = {alpha: 'foo'}
    t.deepEqual(nanomute(state, 'is(alpha, foo)'), true)
})

test('can handle string compare (not-match)', t => {
    const state = {alpha: 'foo'}
    t.deepEqual(nanomute(state, 'is(alpha, bar)'), false)
})

test('can handle boolean compare (match)', t => {
    const state = {alpha: false}
    t.deepEqual(nanomute(state, 'is(alpha, false)'), true)
})

test('can handle boolean compare (not-match)', t => {
    const state = {alpha: true}
    t.deepEqual(nanomute(state, 'is(alpha, false)'), false)
})

test('can child property boolean compare (match)', t => {
    const state = {alpha: {beta: false}}
    t.deepEqual(nanomute(state, 'is(alpha.beta, false)'), true)
})