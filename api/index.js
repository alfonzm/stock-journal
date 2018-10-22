const express = require('express')
const morgan = require('morgan')

// Create express instnace
const app = express()

app.use(morgan('combined'))

// Import API Routes
app.use(require('./routes/phisix'))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}