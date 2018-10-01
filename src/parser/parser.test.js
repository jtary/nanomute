import test from 'ava'
import parser from '.'

test('can parse basic thing', t => {
    parser.yy = {
        scope: {
            somev: 2
        },
        OP: {
            dec: () => parser.yy.scope
        }
    }
    t.deepEqual(parser.parse('dec(somev)'), {somev: 2})
})