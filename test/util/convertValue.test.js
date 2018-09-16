import test from 'ava'
import util from '../../util'

test('convertValue handles boolean true', t => {
    t.deepEqual(util.convertValue('true'), true)
})

test('convertValue handles boolean false', t => {
    t.deepEqual(util.convertValue('false'), false)
})

test('convertValue handles positive integer', t => {
    t.deepEqual(util.convertValue('42'), 42)
})

test('convertValue handles negative integer', t => {
    t.deepEqual(util.convertValue('-1'), -1)
})

test('convertValue handles string', t => {
    t.deepEqual(util.convertValue('hello'), 'hello')
})

test('convertValue handles empty string', t => {
    t.deepEqual(util.convertValue(''), '')
})
