const db = require('../db')

module.exports = db.defineModel('assets', {
	code: {
        type: db.STRING(20),
        unique: true
    }, 
	name: db.STRING(50),
	mfrs: db.STRING(50),
	model: db.STRING(50),
	buy_time: db.DATEONLY,
	use_time: db.DATEONLY,
	scrap_year: db.INTEGER,
	price: db.FLOAT,
	status: db.STRING(20),
	// department: db.STRING(50),
	position: db.STRING(50),
	manager: db.STRING(20),
})