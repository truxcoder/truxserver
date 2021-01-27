const model = require('./model.js')
model.sync().then(() =>{
	console.log('sync done!')
	process.exit(0)
}).catch( err => {
	console.log('something wrong with:'+err)
	process.exit(0)
})
