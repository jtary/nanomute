// Copyright (c) 2018 Joseph Tary

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const parser = require('./parser')
const util = require('./util')

function createScope(scope) {
    const ctx = {
        scope: scope,
        resolve: (operation, params) => {
            if (!Array.isArray(params)) {
                params = [params]
            }

            return ctx.OP[operation].apply(ctx, [ctx.scope].concat(params))
        },
        OP: {
            set: (state, path, value) => {
                return {...state, [path]: value}
            },

            inc: (state, path, value) => {
                const incValue = Number(value || 1)
                const newValue = Number(state[path]) + incValue

                if (!Number.isNaN(newValue)) {
                    return {...state, [path]: newValue}
                }

                return state
            },

            is: (state, path, value) => {
                return util.resolveKey(state, path, (obj, key) => {
                    return value != null ?
                        obj[key] === value :
                        Boolean(obj[key])
                })
            }
        }
    }

    return ctx
}

function nanomute(state, cmdString) {
    if (!state) {
        return undefined
    }

    if(typeof state !== 'object') {
        return state
    }

    parser.yy = createScope(state)
    return parser.parse(cmdString)
}

module.exports = nanomute