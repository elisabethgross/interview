const logs = [
    { user: 1, action: 'A' },
    { user: 1, action: 'B' },
    { user: 2, action: 'A' },
    { user: 1, action: 'C' },
    { user: 2, action: 'B' },
    { user: 3, action: 'Z' },
    { user: 2, action: 'B' },
    { user: 2, action: 'C' },
    { user: 3, action: 'A' },
    { user: 3, action: 'B' },
    { user: 3, action: 'C' },
];

// iterate over the logs
// group logs by user
// constant ['A', 'B', 'C']
// take the actions, look for our problamatic key presses

function findErrors(logs) {
    // group logs by user
    const groupedByUserLogs = logs.reduce((acc, log) => {
        acc[log.user] = acc[log.user] || []
        acc[log.user].push(log)
        return acc
    }, {})

    console.log('groupedByUserLogs', groupedByUserLogs)

    const usersNeedSwag = []

    // iterate over the logs
    for (let i = 0; i < Object.keys(groupedByUserLogs).length; i++) {
        const user = Object.keys(groupedByUserLogs)[i]
        console.log(`Current user ${user}`)
        let badButtons = ['A', 'B', 'C']
        let foundA = false
        for (let j = 0; j < groupedByUserLogs[user].length; j++) {
            const log = groupedByUserLogs[user][j]
            console.log('badButtons', badButtons)
            console.log(`foundA ${foundA}`)
            console.log('log', log)
            if (foundA) {
                if (badButtons.indexOf(log.action) === 0) {
                    badButtons.shift()
                    continue;
                }
            }
            if (log.action !== 'A') {
                foundA = false
                badButtons = ['A', 'B', 'C']
                continue;
            }
            foundA = true
            badButtons.shift()
        }
        if (badButtons.length === 0) {
            console.log(`Adding user ${user} to usersNeedSwag`)
            usersNeedSwag.push(user)
        }
    }

    return usersNeedSwag
}

console.log('Users with errors', findErrors(logs))
// findErrors(logs)

