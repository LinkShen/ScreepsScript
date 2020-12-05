
const creepMgr = require('manager.creepMgr')
const worker = require('role.worker')

init()

module.exports = {
    loop() {
        loopWorkers()
    }
}

function init() {
    if (Memory.spawnMgr == undefined) {
        Memory.spawnMgr = {}
    }
    if (Memory.spawnMgr.workers == undefined) {
        Memory.spawnMgr.workers = []
    }
}

function loopWorkers() {
    activeWorkers = []
    Memory.spawnMgr.workers.forEach(function(cname) {
        if (Game.creeps[cname] == undefined) {
            creepMgr.returnCreep(cname)
            return true
        }

        worker.run(Game.creeps[cname])
        activeWorkers.push(cname)
    })

    if (activeWorkers.length < 1) {
        cname = creepMgr.getCreep(creepMgr.CREEP_TYPE_WORKER)
        creep = Game.creeps[cname]
        if (creep != undefined) {
            creep.memory.task = worker.WORKER_TASK_FILL_SPAWN 
            activeWorkers.push(cname)
        }
    }

    Memory.spawnMgr.workers = activeWorkers
}