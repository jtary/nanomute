import test from 'ava'
import util from '../../util'

test('can get operation with empty params', t => {
    const cmd = util.parse('set()')
    t.deepEqual(cmd.command, 'set')
})

test('param list is empty with empty params', t => {
    const cmd = util.parse('set()')
    t.deepEqual(cmd.param, [])
})

test('missing command should return \'unknown\' for command', t => {
    const cmd = util.parse('()')
    t.deepEqual(cmd.command, 'unknown')
})

test('param list with extraneous commas are treated as empty strings', t => {
    const cmd = util.parse('set(alpha,)')
    t.deepEqual(cmd.param, ['alpha', ''])
})

test('param list for one arg contains argument string', t => {
    const cmd = util.parse('set(prop)')
    t.deepEqual(cmd.param, ['prop'])
})

test('param list for two args (string and int) contains argument string and integer', t => {
    const cmd = util.parse('set(prop, 1)')
    t.deepEqual(cmd.param, ['prop', 1])
})