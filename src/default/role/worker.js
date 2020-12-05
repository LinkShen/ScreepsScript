
module.exports = {

    WORKER_STATUS_IDLE: 0,
    WORKER_STATUS_HARVEST: 1,
    WORKER_STATUS_WORKING: 2,

    WORKER_TASK_UPGRADE_RC: 1,
    WORKER_TASK_FILL_SPAWN: 2,

    run(creep) {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.status = this.WORKER_STATUS_HARVEST
        }
        if (creep.memory.status == this.WORKER_STATUS_HARVEST) {
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.status = this.WORKER_STATUS_WORKING
            }
            var sources = creep.room.find(FIND_SOURCES_ACTIVE)
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1])
            }
            return
        }
        
        switch (creep.memory.task) {
            case this.WORKER_TASK_UPGRADE_RC:
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
                break
            case this.WORKER_TASK_FILL_SPAWN:
            default:
                if (creep.transfer(Game.spawns.Hangzhou, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Hangzhou)
                }
        }
    },

    setTask(creep, task) {
        if (creep == undefined) return
        creep.memory.task = task
    }
} 