
const rcMgr = require('manager.rcMgr')
const spawnMgr = require('manager.spawnMgr')
const creepMgr = require('manager.creepMgr')
const worker = require('role.worker')

module.exports.loop = function() {
    rcMgr.loop()
    spawnMgr.loop()
}