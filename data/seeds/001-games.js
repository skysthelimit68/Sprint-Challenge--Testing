
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Pacman', genre: "Arcade", releaseYear:1980},
        {title: 'Super Mario Brother', genre: "Platformer", releaseYear:1985},
        {title: 'Zelda - Link to the past', genre: "Advanture", releaseYear:1991},
        {title: 'Chinese Poker Pro', genre: "Card Game", releaseYear:2009},
        {title: 'Perfect 10+', genre: "Arcade", releaseYear:2010},
        {title: 'Road Racer', genre: "Racing", releaseYear:2013},
        {title: 'Mighty Chicken and Friends', genre: "Arcade", releaseYear:2018},
        {title: 'Skull Valley', genre: "Arcade", releaseYear:2019},
        {title: 'Lucy Run', genre: "Platformer", releaseYear:2020}

      ]);
    });
};
