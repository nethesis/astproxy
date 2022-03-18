const { ami } = require('../ami_config')
const { structs } = require('../data/structures')
const { hasStructure, hasTypes } = require('../utils')
const listQueues = require('../../lib/plugins_command_13/listQueues')

let cbExecuted
let actionId

test('listQueues test', done => {
  ami.on('data', data => {
    try {
      
      // wait for ami to be ready
      if (data.event == 'FullyBooted') {

        // execute the command
        actionId = listQueues.execute(
          // the actual ami initialization
          ami,
          // the object containing args
          {},
          // the cb function executed by the command
          (err, res) => {

            // perform callback data checks
            // if err is different than null the test must fail
            expect(err).toBeNull()

            if (res && Object.keys(res).length > 0) {
              // check cb response structure
              expect(hasStructure(res[0], structs.listqueues_cb)).toBeTruthy()
              // check cb response types
              expect(hasTypes(res[0], structs.listqueues_cb)).toBeTruthy()
            }
            else {
              expect(res).toMatchObject([])
            }
            // set cb executed to true
            cbExecuted = true
          }
        )
      }
      // handle for ami data
      else {

        // send data to command's data function
        listQueues.data(data)

        // perform ami data checks
        if (data.actionid == actionId) {

          if (data.response == 'Success') {
            expect(data.eventlist).toBe('start')
          }

          else if (data.event == 'QueueSummary') {
            // check ami data response structure
            expect(hasStructure(data, structs.listqueues_ami)).toBeTruthy()
            // check ami data response types
            expect(hasTypes(data, structs.listqueues_ami)).toBeTruthy()
          }

          else if (data.event == 'QueueSummaryComplete' && cbExecuted) {
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
