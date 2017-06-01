exports.seed = function (knex, Promise) {
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { name: 'Box of Stuff', reason: 'Still need it', cleanliness: 'Dusty' },
        { name: 'Lawnmower', reason: 'Gotta mow the lawn', cleanliness: 'Dusty' },
        { name: 'Cans', reason: 'Need to recyle', cleanliness: 'Rancid' },
        { name: 'Car', reason: 'Need to get around', cleanliness: 'Sparkling' },
      ])
    })
}
