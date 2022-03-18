const { ami } = require('../ami_config')
const { extens } = require('../extens_config')
const { structs } = require('../data/structures')
const { hasStructure, hasTypes } = require('../utils')
const dndGet = require('../../lib/plugins_command_13/dndGet')

let cbExecuted
let actionId

test('dndGet test', done => {
  ami.on('data', data => {
    try {
      
      // wait for ami to be ready
      if (data.event == 'FullyBooted') {

        // execute the command
        actionId = dndGet.execute(
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
            expect(hasStructure(res, structs.dndget_cb)).toBeTruthy()

            // check cb response types
            expect(hasTypes(res, structs.dndget_cb)).toBeTruthy()

            expect(err).toBeNull()

            // set cb executed to true
            cbExecuted = true
          }
        )
      }
      // handle for ami data
      else {

        // send data to command's data function
        dndGet.data(data)

        // perform ami data checks
        if (data.actionid == actionId) {

          if (data.response == 'Success') {
            expect(data.eventlist).toBe('start')
          }

          else if (data.event == 'DBGetResponse') {
            // check ami data response structure
            expect(hasStructure(data, structs.dbget_ami)).toBeTruthy()
            // check ami data response types
            expect(hasTypes(data, structs.dbget_ami)).toBeTruthy()
          }

          else if (data.event == 'DBGetComplete' && cbExecuted) {
            done()
          }
          else if (data.response == 'Error' && cbExecuted) {
            // if response is error the test must pass
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
