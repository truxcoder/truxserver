const model = require('./model.js')
let User = model.User
let Department = model.Department
let Asset = model.Asset
Department.hasMany(User)
User.belongsTo(Department)
Department.hasMany(Asset)
Asset.belongsTo(Department)

model.sync().then(() =>{
	console.log('sync done!')
	process.exit(0)
}).catch( err => {
	console.log('something wrong with:'+err)
	process.exit(0)
})
