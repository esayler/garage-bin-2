const JSONAPISerializer = require('jsonapi-serializer').Serializer

const ItemSerializer = new JSONAPISerializer('items', {
  topLevelLinks: {
    self: '/api/v1/items',
  },
  attributes: [
    'name',
    'reason',
    'cleanliness',
  ],
})

module.exports = { ItemSerializer }
