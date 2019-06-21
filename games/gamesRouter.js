const router = require('express').Router;

const Games = require('./gamesModel.js');

router.get('/', (req, res) => {
    Games.getAll()
    .then( games => {
        console.log(games)
        res.status(200).json(games)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


module.exports = router;