const db = require('../db/queries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories()
    return categories
}

async function getCategoryFromGame(req, res) {
    const category = await db.getCategoryFromGame(req.body.game)
    return category
}

async function insertCategory(req, res) {
    db.getMaxIdCateg().then(id => {
        console.log(id[0].max + 1)
        db.insertCategory(id[0].max + 1, req.body.category)
    })
    res.redirect('/')
}

async function deleteCategory(req, res) {
    db.getCategoryFromId(req.params.id).then(categ => {
        db.deleteCategory(req.params.id)
        console.log(req.params.id)
    })
    res.redirect('/')
}

async function editCategory(req, res) {
    db.editCategory(req.params.id, req.body.category)
    res.redirect('/')
}

async function getCategoryFromId(req, res) {
    const category = await db.getCategoryFromId(req.params.id)
    return category
}

module.exports = {
    getAllCategories,
    insertCategory,
    deleteCategory,
    editCategory,
    getCategoryFromId
}