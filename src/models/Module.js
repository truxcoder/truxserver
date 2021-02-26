const db = require('../db');

module.exports = db.defineModel('modules', {
    name: db.STRING(50),
    title: db.STRING(50),
    path: db.STRING(50),
    rank: db.INTEGER,
    component: db.STRING(50),
    redirect: db.STRING(50),
    icon: db.STRING(50),
    parent: db.STRING(50),
    order: db.INTEGER
})