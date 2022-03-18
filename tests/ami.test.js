const { ami } = require('./ami_config')

describe('ami connection test', () => {
  test('connected', done => {
    ami.on('connection-connect', () => {
      done()
    })
  })
  test('logged in', done => {
    ami.on('login', (err, resp) => {
      expect(err).toBeNull()
      expect(resp.message).toBe('Authentication accepted')
      done()
    })
  })
})

ami.connect()

afterAll(() => {
  ami.disconnect()
})
