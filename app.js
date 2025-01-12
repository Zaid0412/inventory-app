require('dotenv').config()
const gameControllers = require('./controllers/gameControllers')
const categoryControllers = require('./controllers/categoryControllers')
const { Pool } = require('pg')
const path = require('node:path')
const express = require('express')
const app = express()
const PORT = process.env.PORT

const db = require('./db/queries')

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
});

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/categories/new', (req, res) => {
    categoryControllers.getAllCategories(req, res).then(categs => {
        res.render('categoryForm', {categories: categs})
    })
})

app.post('/categories/new', categoryControllers.insertCategory)

app.get('/categories/edit/:id', (req, res) => {
    db.getCategoryFromId(req.params.id).then(categ => {
        categoryControllers.getAllCategories(req, res).then(categs => {
            db.getIdFromCategory(categ[0].name).then(categId => {
                res.render('editCategoryForm', {categories: categs, categ: categ[0], categId: categId[0]})
            })
        })
    })
})

app.post('/categories/edit/:id', categoryControllers.editCategory)

app.post('/categories/delete/:id',categoryControllers.deleteCategory)

app.get(['/categories/:id'], (req, res) => {
    // const categoryId = req.params.id;
    categoryControllers.getCategoryFromId(req, res).then(categ => {
        db.getGamesFromCategory(categ[0].name).then(games => {
            categoryControllers.getAllCategories(req, res).then(categs => {
                res.render('index', {categories: categs, games, categName: categ[0], searchWord: false})
            })
        })
    })
})

app.get('/games/edit/:id', (req, res) => {
    db.getGameFromId(req.params.id).then(game => {
        categoryControllers.getAllCategories(req, res).then(categs => {
            res.render('editGameForm', { categories: categs, game: game[0]})
        })
    })
})

app.post('/games/edit/:id', gameControllers.editGame)

app.get('/games/new', (req, res) => {
    categoryControllers.getAllCategories(req, res).then(categs => {
        res.render('gameForm', {categories: categs})
    })
})

app.post('/games/new', gameControllers.insertGame)

app.post('/games/delete/:id', gameControllers.deleteGame)

app.get(['/games/:id', '/categories/games/:id'], (req, res) => {
    db.getGameFromId(req.params.id).then(game => {
        categoryControllers.getAllCategories(req, res).then(categs => {
            db.getCategoryFromGame(game[0].name).then(gameCateg => {
                    db.getIdFromCategory(gameCateg[0].category_name).then(categId => {
                    res.render('game', {categories: categs, gameCateg: gameCateg[0], categId: categId[0],  game: game[0]})
                })
            })
        })
    })
})


app.post('/search', gameControllers.searchGame)

app.get('/', (req, res) => {
    categoryControllers.getAllCategories(req, res).then(categs => {
        gameControllers.getAllGames(req, res).then(games => {
            res.render('index', {categories: categs, games, categName: false, searchWord: false})
        })
    })
    // gameControllers.getAllGames().then(e => console.log(e))
    // db.searchGame('MinE').then(e => console.log(e))
    // db.getGamesFromCategory('Action').then(e => console.log(e))
})

app.listen(PORT, () => console.log(`App Listening on Port: ${PORT}`))

// test 