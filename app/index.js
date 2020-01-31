const { API_PORT } = require('./config')
const { apollo, server, wss } = require('./app')

// for shutdown
// const mongo = require('./services/mongo')
// const Model = require('./services/database')

server.listen(API_PORT, () => {
  console.log('REST API listening on port ' + API_PORT)
  console.log(`🚀 GraphQL Server ready at http://localhost:${API_PORT}${apollo.graphqlPath}`)
  console.log(`🚀 GraphQL Subscriptions ready at ws://localhost:${API_PORT}${apollo.subscriptionsPath}`)
})

process.on('SIGINT', handleExit)
process.on('SIGQUIT', handleExit)
process.on('SIGTERM', handleExit)

function handleExit(signal) {
  console.log(`Received ${signal}. Close my server properly.`)
  server.close(() => {
    console.log('Server closed.')
    // close your other stuff...
    wss.close((err) => console.log(err || 'WS API CLOSE OK')) // websockets
    // TBD apollo - does apollo have a shutdown?
    // database / mongo
    // mongo.db.close(false, (err, res) => {
    //   console.log('MongoDb connection closed.')
    //   process.exit(0)
    // })

    process.exit(0)
  })
}
