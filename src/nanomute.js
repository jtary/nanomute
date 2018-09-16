const util = require('./util')

function nanomute(state, cmdString) {
    if (typeof state !== 'object') {
        return state
    }

    const updates = {...state}
    const cmd = util.parse(cmdString)

    if (cmd.command === 'set') {
        updates[cmd.param[0]] = cmd.param[1]
    }

    if (cmd.command === 'is') {
        return util.resolveKey(updates, cmd.param[0], (object, key) => {
            return (object[key] === cmd.param[1])
        })
    }

    if (cmd.command === 'inc') {
        util.resolveKey(updates, cmd.param[0], (object, key) => {
            const value = cmd.param[1] || 1
            if (typeof object[key] === 'number' && typeof value === 'number') {
                object[key] += cmd.param[1] || 1
            }
        })
    }

    return updates
}

module.exports = nanomute