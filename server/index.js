const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const environment = process.env.NODE_ENV || 'development'

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

if (environment === 'development') {
  console.log(environment)
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
    inline: true,
    noInfo: true,
  }))
}

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)

const api = require('./api')

app.use('/api/v1', api)

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`We running on ${app.get('port')}.`)
  })
}


module.exports = app
