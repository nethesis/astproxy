const { ami } = require('../ami_config')
const { extens } = require('../extens_config')
const { strs } = require('../data/strings')
const cfSet = require('../../lib/plugins_command_13/cfSet')

let cbExecuted
let actionId

test('cfSet test', done => {
  ami.on('data', data => {
    try {
      
      // wait for ami to be ready
      if (data.event == 'FullyBooted') {

        // execute the command
        actionId = cfSet.execute(
          // the actual ami initialization
          ami,
          // the object containing args
          {
            exten: extens[0].exten,
            val: extens[1].exten,
            activate: true
          },
          // the cb function executed by the command
          (err) => {

            // perform callback data checks
            // if err is set the test must fail
            expect(err).toBeNull()
            // set cb executed to true
            cbExecuted = true
          }
        )
      }
      // handle for ami data
      else {

        // send data to command's data function
        cfSet.data(data)

        // perform ami data checks
        if (data.actionid == actionId) {

          if (data.response == 'Success') {
            expect(data.message).toBe(strs.db_update_success)
            done()
          }
        }
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
