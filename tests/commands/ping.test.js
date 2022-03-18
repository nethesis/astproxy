const { ami } = require('../ami_config')
const { strs } = require('../data/strings')
const { getActionId } = require('../../lib/action')

const actionId = getActionId('ping')

test('ping test', done => {
  ami.on('data', data => {
    try {
      if (data.event == 'FullyBooted') {

        // send ping action
        ami.send({
          Action: 'Ping',
          ActionID: actionId
        })

      } else if (data.response == 'Success' && data.actionid == actionId) {

        // check response data
        expect(data.ping).toBe(strs.pong)
        done()

      } 
    } catch (error) {
      done(error)
    }
  })
})

ami.connect()

afterAll(() => {
  ami.disconnect()
})
