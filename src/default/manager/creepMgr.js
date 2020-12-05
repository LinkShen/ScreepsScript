
init()

module.exports = {

    CREEP_TYPE_WORKER: 1,

    getCreep(type) {
        name = 'worker'+Memory.creepMgr.seq++
        ret = Game.spawns.Hangzhou.spawnCreep([WORK, CARRY, MOVE, MOVE], name)
        // console.log(`spawn creep. name=${name} ret=${ret}`)
        return name
    },

    returnCreep(name) {
        if (Game.creeps[name] == undefined) {
            if (Memory.creeps[name] != undefined) {
                delete(Memory.creeps[name])
            }
        }
    }
}

function init() {
    if (Memory.creepMgr == undefined) {
        Memory.creepMgr = {}
    }
    if (Memory.creepMgr.seq == undefined) {
        Memory.creepMgr.seq = 1
    }
}