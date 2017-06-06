exports.seed = function (knex, Promise) {
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { id: 1, name: 'Box of Stuff', reason: 'Still need it', cleanliness: 'Dusty' },
        { id: 2, name: 'Lawnmower', reason: 'Gotta mow the lawn', cleanliness: 'Dusty' },
        { id: 3, name: 'Cans', reason: 'Need to recyle', cleanliness: 'Rancid' },
        { id: 4, name: 'Car', reason: 'Need to get around', cleanliness: 'Sparkling' },
      ])
    })
}
