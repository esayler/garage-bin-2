exports.up = function (knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.text('reason')
    table.enu('cleanliness', ['Sparkling', 'Dusty', 'Rancid'])
    table.boolean('deleted').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('items')
}


