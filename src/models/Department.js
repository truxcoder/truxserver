const db = require('../db');

module.exports = db.defineModel('departments', {
    name: db.STRING(50),
    parent: db.STRING(50),
    isentity: db.BOOLEAN,
    order: db.INTEGER
})