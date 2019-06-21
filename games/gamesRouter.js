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
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error=> {
        res.status(500).json(error.message)
    })
})


router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.body.game)
})

router.delete('/:id', validateId, (req, res) => {
    Games.remove(req.params.id)
    .then( response => {
        res.status(200).json({message: `${response} game deleted`})
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

//middleware

function validateData(req, res, next) {
    if(req.body && req.body.title && req.body.genre) { 
        const title = req.body.title
        Games.findBy( {title} )
            .then( games => {
                if(games.length > 0) {
                    res.status(405).json({message: "Game already in database"})
                } else {
                    next();
                }        
            })
            .catch( error => {
                res.status(500).json(error)
            })
    }
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