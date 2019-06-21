const router = require('express').Router();

const Games = require('./gamesModel.js');

router.get('/', (req, res) => {
    Games.getAll()
    .then( games => {
        res.status(200).json(games)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', validateData, (req, res) => {
    const game = req.body
    Games.insert(game)
    .then(res => {
        res.status(201).json(res)
    })
    .catch(error=> {
        res.status(500).json(error.message)
    })
})


router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.body.game)
})

//middleware

function validateData(req, res, next) {
    if(req.body && req.body.title && req.body.genre) next();
    else {
        res.status(422).json({message: "data provided is incomplete"})
    }
}

function validateId(req, res, next) {
    Games.findById(req.params.id)
    .then( game => {
        if(game) { 
            req.body.game = game;
            next();
        }
       
        else {
            res.status(404).json({message:"game not found"})
        }
    })
    .catch( error => {  
        res.status(500).json(error)
    })
}


module.exports = router;