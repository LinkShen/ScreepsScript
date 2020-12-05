
const creepMgr = require('manager.creepMgr')
const worker = require('role.worker')

init()

module.exports = {
    loop() {
        loopWorkers()
    }
}

function init() {
    if (Memory.rcMgr == undefined) {
        Memory.rcMgr = {}
    }
    if (Memory.rcMgr.workers == undefined) {
        Memory.rcMgr.workers = []
    }
}

function loopWorkers() {
    activeWorkers = []
    Memory.rcMgr.workers.forEach(function(cname) {
        if (Game.creeps[cname] == undefined) {
            creepMgr.returnCreep(cname)
            return true
        }

        worker.run(Game.creeps[cname])
        activeWorkers.push(cname)
    })

    if (activeWorkers.length < 3) {
        cname = creepMgr.getCreep(creepMgr.CREEP_TYPE_WORKER)
        creep = Game.creeps[cname]
        if (creep != undefined) {
            creep.memory.task = worker.WORKER_TASK_UPGRADE_RC 
            activeWorkers.push(cname)
        }
    }

    Memory.rcMgr.workers = activeWorkers
}