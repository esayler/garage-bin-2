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
  knex('items')
    .select()
    .where('deleted', false)
    .then(items => {
      if (items.length === 0) {
        res.status(404).json({ error: 'not found' })
      } else {
        res.status(200).json(ItemSerializer.serialize(items))
      }
    })
    .catch(error => {
      console.error(chalk.red('error getting items: ', error))
      res.status(500).json(error)
    })
})

router.get('/items/:id', (req, res) => {
  const { id } = req.params
  knex('items')
    .select()
    .where('id', id)
    .andWhere('deleted', false)
    .then(items => {
      if (items.length === 0) {
        res.sendStatus(404)
      } else {
        res.status(200).json(ItemSerializer.serialize(items))
      }
    })
    .catch(error => {
      console.error(chalk.red('error getting one item: ', error))
      res.status(500).json(error)
    })
})

router.post('/items', (req, res) => {
  const { name, reason, cleanliness } = req.body
  console.log(chalk.blue('name:', name, cleanliness, reason))
  if (!name || !reason || !cleanliness) {
    res.sendStatus(400)
  } else {
    knex('items')
      .insert({ name, reason, cleanliness }, 'id')
      .then(ids => {
        res.location('/api/v1/items/' + ids[0])
        return knex('items')
          .select()
          .where('id', ids[0])
          .andWhere('deleted', false)
      })
      .then(items => {
        res.status(201).json(ItemSerializer.serialize(items))
      })
      .catch(error => {
        console.error(chalk.red('error posting one item: ', error))
        res.status(500).json(error)
      })
  }
})

router.patch('/items/:id', (req, res) => {
  const { id } = req.params
  const { name, reason, cleanliness } = req.body
  knex('items')
    .where('id', id)
    .update({ name, reason, cleanliness }, 'id')
    .then(ids => {
      return knex('items').where('id', ids[0])
    })
    .then(items => {
      if (items.length === 0) {
        res.sendStatus(404)
      } else {
        res.status(200).json(ItemSerializer.serialize(items))
      }
    })
    .catch(error => {
      console.error(chalk.red('error updating one item: ', error))
      res.status(500).json(error)
    })
})

router.delete('/items/:id', (req, res) => {
  const { id } = req.params
  knex('items')
    .where('id', id)
    .update({ deleted: true }, 'id')
    .then(ids => {
      if (ids.length === 0) {
        res.status(404).json({ error: `error when attempting to delete item ${ids[0]}` })
      } else {
        res.status(200).json({ success: `successfully deleted item ${ids[0]}` })
      }
    })
    .catch(error => {
      console.error(chalk.red('error deleting one item: ', error))
      res.status(500).json(error)
    })
})

module.exports = router
