import test from 'ava'
import sinon from 'sinon'
import util from '../../src/util'

test('flat object calls callback with original object and key', t => {
    const state = {alpha: 1}
    const spy = sinon.spy()

    util.resolveKey(state, 'alpha', spy)
    t.is(spy.calledWith(state, 'alpha'), true)
})

test('complex object calls callback child original object and reduced key', t => {
    const state = {alpha: {beta: 1}}
    const spy = sinon.spy()

    util.resolveKey(state, 'alpha.beta', spy)
    t.is(spy.calledWith(state.alpha, 'beta'), true)
})

test('with no callback, returns the resolved value', t => {
    const state = {alpha: {beta: 1}}

    t.deepEqual(util.resolveKey(state, 'alpha.beta'), 1)
})
