const os = require('os')
const fs = require('fs')

const EventEmitter = require('events')

class Logger extends EventEmitter {
    log(msg) {
        this.emit('msg', { msg })
    }
}

const logger = new Logger()
const logFile = './eventLog.txt'

const logToFile = e => {
    const logMsg = `${new Date().toISOString()}: ${e.msg}\n`
    fs.appendFileSync(logFile, logMsg)
}

logger.on('msg', logToFile)

setInterval(() => {
    const memUsage = (os.freemem() / os.totalmem()) * 100
    logger.log(`Current Memory Usage: ${memUsage.toFixed(2)}`)
}, 3000);

logger.log('Application started')
logger.log('Application event occurred')