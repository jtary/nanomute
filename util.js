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

function convertValue(raw) {
    // handle boolean conversion
    if (raw === 'true' || raw === 'false') {
        return raw === 'true'
    }

    // handle number conversion
    const num = Number(raw)
    if (!Number.isNaN(num)) {
        return num
    }

    // strings
    return raw
}

function resolveKey(state, rawKey, operator) {
    const parts = rawKey.split('.')
    let lastK = null
    const obj = parts.reduce((o, k) => {
        lastK = k

        if (o.hasOwnProperty(k) && typeof o[k] === 'object') {
            return o[k]
        }

        return o
    }, state)

    return operator(obj, lastK)
}

function parse(cmdString) {
    const regex = /^(\w+)\((.+)(?:, ?(\w+))\)$/g
    const match = regex.exec(cmdString)
    const params = match.splice(2).map(convertValue)

    return {
        command: match[1],
        param: params
    }
}

module.exports = {
    resolveKey: resolveKey,
    convertValue: convertValue,
    parse: parse
}