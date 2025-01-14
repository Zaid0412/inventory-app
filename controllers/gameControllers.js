const db = require('../db/queries')
const categoryControllers = require('./categoryControllers')

async function getAllGames(req, res) {
    const games = await db.getAllGames()
    return games
}

async function insertGame(req, res) {
    db.getMaxIdGame().then(id => {
        db.insertGame(id[0].max + 1 ,req.body.name, req.body.price, req.body.desc, req.body.categoryId)
    })
    res.redirect('/')
}   

async function deleteGame(req, res) {
    db.deleteGame(req.params.id)
    res.redirect('/')
}

async function editGame(req, res) {
    db.editGame(req.params.id, req.body.name, req.body.price, req.body.desc, req.body.categoryId)
    res.redirect('/')
}

async function getGamesFromCategory(req, res) {
    const games = await db.getGamesFromCategory(req.body.category)   
    return games
}

async function searchGame(req, res) {
    const games = await db.searchGame(req.body.searchWord)
    categoryControllers.getAllCategories(req, res).then(categs => {
        res.render('index', {categories: categs, games, categName: false, searchWord: req.body.searchWord})
        console.log(req.body.searchWord)
    })
}

module.exports = {
    getAllGames,
    deleteGame,
    editGame,
    getGamesFromCategory,
    insertGame,
    searchGame
}