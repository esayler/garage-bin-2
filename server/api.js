const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const _ = require('lodash')
const Promise = require('bluebird')

const { ItemSerializer } = require('./serializer')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

router.get('/items', (req, res) => {

})

router.get('/items/:id', (req, res) => {
  const { id } = req.params
})

router.post('/items', (req, res) => {

})

router.patch('/items/:id', (req, res) => {
  const { id } = req.params
})

router.delete('/items/:id', (req, res) => {
  const { id } = req.params
})


module.exports = router
