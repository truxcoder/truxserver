const db = require('../db');

module.exports = db.defineModel('users', {
    code: {
        type: db.STRING(20),
        unique: true
    }, 
    name: db.STRING(50),
    role_id: db.STRING(50),
    phone: db.STRING(15),
    // department: db.STRING(50),
    status: db.BOOLEAN,
    create_time: db.DATEONLY
})