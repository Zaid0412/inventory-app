const pool = require('./pool')

async function insertGame(name, price, desc, categoryId) {
    await pool.query(`INSERT INTO games (name, price, description, category_id) VALUES ($1, $2, $3, $4)`, [name, price, desc, categoryId] )
}

async function deleteGame(gameId) {
    await pool.query(`DELETE FROM games WHERE id = $1`, [gameId])
}

async function editGame(gameId, name, price, desc, category_id) {
    await pool.query(`UPDATE games 
 SET name = $1, price = $2, description = $3, category_id = $4 
 WHERE id = $5`, [name, price, desc, category_id, gameId])
}

async function getAllGames() {
    const { rows } = await pool.query('SELECT * FROM games')
    return rows
}

async function getGamesFromCategory(category) {
    const { rows } = await pool.query(`
        SELECT g.id, g.name, g.price, g.description, g.category_id FROM games g JOIN categories c ON g.category_id = c.id WHERE c.name = $1
    `, [category])
    return rows
}

async function getGameFromId(gameId) {
    const { rows } = await pool.query(`SELECT * FROM games WHERE id=${gameId}`)
    return rows
}

async function searchGame(searchWord) {
    const { rows } = await pool.query(`SELECT * FROM games WHERE LOWER(name) LIKE '%${searchWord.toLowerCase()}%'`)
    return rows
}

async function insertCategory(category) {
    await pool.query(`INSERT INTO categories (name) VALUES ($1)`, [category])
}

async function deleteCategory(categId) {
    await pool.query('DELETE FROM games WHERE category_id = $1', [categId]);
    await pool.query(`DELETE FROM categories WHERE id = $1`, [categId])
}

async function editCategory(categId, categName) {
    await pool.query(`UPDATE categories SET name = $1 WHERE id = $2`, [categName, categId])
}

async function getAllCategories() {
    const { rows } = await pool.query(`SELECT * FROM categories`)
    return rows
}

async function getCategoryFromGame(game) {
    const { rows } = await pool.query(`SELECT c.name AS category_name FROM games g JOIN categories c ON g.category_id = c.id WHERE g.name = '${game}'`)
    return rows
}

async function getCategoryFromId(categoryId) {
    const { rows } = await pool.query(`SELECT name FROM categories WHERE id=${categoryId}`)
    return rows
}

async function getIdFromCategory(category_name) {
    const { rows } = await pool.query(`SELECT id FROM categories WHERE name= $1`, [category_name])
    return rows
}

module.exports = {
    insertGame,
    deleteGame,
    editGame,
    getAllGames,
    getGamesFromCategory,
    getGameFromId,
    searchGame,
    insertCategory,
    deleteCategory,
    editCategory,
    getAllCategories,
    getCategoryFromGame,
    getCategoryFromId,
    getIdFromCategory
}