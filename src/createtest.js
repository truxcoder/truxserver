const model = require('./model')

let Asset = model.Asset
let now = Date.now();
(async () => {
    let asset= await Asset.create({
        code: 'GD20201101',
        name: '打印机',
        mfrs: '三星',
        model: 'ATX4321',
        buy_time: '2008-08-08',
        use_time: '2008-08-08',
        status: '正常',
        department: '办公室',
        position: '信息中心主任办公室',
        manager: '李晓波'
    })
    console.log('created: ' + JSON.stringify(asset))
})()