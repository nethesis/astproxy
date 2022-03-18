exports.structs = {
  listqueues_cb: {
    queue: ['string']
  },
  listqueues_ami: {
    event: ['string'],
    queue: ['string'],
    loggedin: ['string'],
    available: ['string'],
    callers: ['string'],
    holdtime: ['string'],
    talktime: ['string'],
    longestholdtime: ['string'],
    actionid: ['string']
  },
  listchannels_cb: {
    status: ['string'],
    channel: ['string'],
    uniqueid: ['string'],
    callerNum: ['string'],
    callerName: ['string'],
    bridgedNum: ['string'],
    bridgedName: ['string'],
    inConference: ['boolean'],
    channelExten: ['string'],
    linkedid: ['string'],
    bridgeid: ['string', 'object']
  },
  listchannels_ami: {
    event: ['string'],
    actionid: ['string'],
    channel: ['string'],
    channelstate: ['string'],
    channelstatedesc: ['string'],
    calleridnum: ['string'],
    calleridname: ['string'],
    connectedlinenum: ['string'],
    connectedlinename: ['string'],
    language: ['string'],
    accountcode: ['string'],
    context: ['string'],
    exten: ['string'],
    priority: ['string'],
    uniqueid: ['string'],
    linkedid: ['string'],
    application: ['string'],
    applicationdata: ['string', 'object'],
    duration: ['string'],
    bridgeid: ['string', 'object']
  },
  dbget_cb_1: {
    exten: ['string'],
    status: ['string'],
    cf_type: ['string', 'undefined']
  },
  dbget_cb_2: {
    exten: ['string'],
    status: ['string'],
    cf_type: ['string', 'undefined'],
    to: ['string']
  },
  dbget_cb_3: {
    family: ['string'],
    key: ['string'],
    val: ['string']
  },
  dbget_ami: {
    event: ['string'],
    family: ['string'],
    key: ['string'],
    val: ['string'],
    actionid: ['string']
  },
  dndget_cb: {
    exten: ['string'],
    dnd: ['string']
  },
  extenstatus_cb: {
    exten: ['string'],
    status: ['string']
  },
  extenstatus_ami: {
    response: ['string'],
    actionid: ['string'],
    message: ['string'],
    exten: ['string'],
    context: ['string'],
    hint: ['string'],
    status: ['string'],
    statustext: ['string']
  }
}
