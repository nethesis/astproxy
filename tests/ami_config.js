const fs = require('fs')
const asteriskAmi = require('asterisk-ami')
const { ASTERISK_CONFIG_FILE } = require('./config')
const config = JSON.parse(fs.readFileSync(ASTERISK_CONFIG_FILE, 'utf8'))

exports.ami = new asteriskAmi(
  {
    port: config.port,
    host: config.host,
    username: config.user,
    password: config.pass,
    prefix: config.prefix,
    qm_alarms_notifications: config.qm_alarms_notifications,
    auto_c2c: config.auto_c2c,
    null_call_period: config.null_call_period,
    trunks_events: config.trunks_events,
    reconnect: true,
    reconnect_after: 3000
  }
)