const { ami } = require('../ami_config')
const { extens } = require('../extens_config')
const { structs } = require('../data/structures')
const { hasStructure, hasTypes } = require('../utils')
const extenStatus = require('../../lib/plugins_command_13/extenStatus')

let cbExecuted
let actionId

test('extenStatus test', done => {
  ami.on('data', data => {
    try {
      
      // wait for ami to be ready
      if (data.event == 'FullyBooted') {

        // execute the command
        actionId = extenStatus.execute(
          // the actual ami initialization
          ami,
          // the object containing args
          {
            exten: extens[0].exten
          },
          // the cb function executed by the command
          (err, res) => {

            // perform callback data checks
            expect(res).not.toBeUndefined()

            // check cb response structure
            expect(hasStructure(res, structs.extenstatus_cb)).toBeTruthy()

            // check cb response types
            expect(hasTypes(res, structs.extenstatus_cb)).toBeTruthy()

            expect(err).toBeNull()

            // set cb executed to true
            cbExecuted = true
          }
        )
      }
      // handle for ami data
      else {

        // send data to command's data function
        extenStatus.data(data)

        // perform ami data checks
        if (data.actionid == actionId) {

          if (data.response == 'Success' && cbExecuted) {

            // check ami data response structure
            expect(hasStructure(data, structs.extenstatus_ami)).toBeTruthy()

            // check ami data response types
            expect(hasTypes(data, structs.extenstatus_ami)).toBeTruthy()

            done()
          }

          else if (data.response == 'Error' && cbExecuted) {
            // if response is error the test must fail
            done('error')
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
