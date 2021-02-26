const model = require('./model')
const Mock = require('mockjs')
const errors = require('./dicts/errors')
let Asset = model.Asset
let User = model.User
let Department = model.Department
let Module = model.Module

Department.hasMany(User)
User.belongsTo(Department)
Department.hasMany(Asset)
Asset.belongsTo(Department)

Mock.Random.extend({
  phone: function() {
    let phonePrefixs = '18080565' // 自己写前缀哈
    return phonePrefixs + Mock.mock(/\d{3}/) //Number()
  }
})

const makeModel = () => {
  let str = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let index1 = Math.floor(Math.random() * 26)
  let index2 = Math.floor(Math.random() * 26)
  let num = Math.floor(Math.random() * 8999) + 1000
  let model = str[index1] + str[index2] + num
  return model
}

let assetMockTpl = {
  'items|30': [{
    'code|+1': 20200001,
    'name|1': ['服务器', '交换机', '显示器', '球机', '枪机', '硬盘录像机', 'PC', '打印机', '一体机', '投影仪'],
    'mfrs|1': ['联想', '华为', '海康', '惠普', '三星', '戴尔', '松下', '索尼'],
    'status|1': ['正常', '损坏', '维修', '报废', '丢失'],
    'departmentId|1': null,
    // 'departmentId|1': Mock.Random.pick(departmentList),
    // 'department|1': ['办公室', '政治处', '财务科','管理科','生产科'],
    position: '@city',
    model: makeModel,
    scrap_year: '@integer(3,15)',
    price: '@float(1000,100000)',
    manager: '@cname',
    buy_time: '@date',
    use_time: '@date',
  }]
}

let userMockTpl = {
  'items|30': [{
    'code|+1': 5159000,
    name: '@cname',
    'role_id|+1': 10000,
    phone: '@phone',
    'status|1': '@boolean()',
    'departmentId|1': null,
    create_time: '@date',
  }]
}

const deptFake1 = [
  { name: '政治处', parent: '0', isentity: 1, order: 2 },
  { name: '办公室', parent: '0', isentity: 1, order: 3 },
  { name: '财务科', parent: '0', isentity: 1, order: 4 },
  { name: '督察科', parent: '0', isentity: 1, order: 5 },
  { name: '管理科', parent: '0', isentity: 1, order: 6 },
  { name: '生产科', parent: '0', isentity: 1, order: 7 },
  { name: '警戒护卫大队', parent: '0', isentity: 1, order: 8 },
  { name: '后勤保障大队', parent: '0', isentity: 1, order: 9 },
  { name: '大队', parent: '0', isentity: 0, order: 10 },
]
const deptFake2 = [
  { name: '一大队', parent: '0', isentity: 1, order: 11 },
  { name: '二大队', parent: '0', isentity: 1, order: 12 },
  { name: '三大队', parent: '0', isentity: 1, order: 13 },
  { name: '四大队', parent: '0', isentity: 1, order: 14 },
  { name: '五大队', parent: '0', isentity: 1, order: 15 },
  { name: '六大队', parent: '0', isentity: 1, order: 16 },
]
// function randomString(e) {  
// 	e = e || 32;
// 	let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
// 	a = t.length,
// 	n = "";
// 	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
// 	return n
// }

// function randomNum(Min,Max)
// {
// 	let Range = Max - Min;
// 	let Rand = Math.random();
// 	return(Min + Math.round(Rand * Range));
// }
// 


let runfack = (async () => {
    await Department.create({ name: '四川省资阳强制隔离戒毒所', parent: '0', isentity: 0, order: 1 })
    const rootDept = await Department.findOne()
    console.log(rootDept)
    deptFake1.map(item => item.parent = rootDept.id)
    for (item of deptFake1) {
      await Department.create(item)
    }
    const dadui = await Department.findOne({ where: { name: '大队' } })
    deptFake2.map(item => item.parent = dadui.id)
    for (item of deptFake2) {
      await Department.create(item)
    }
    const departments = await Department.findAll({
      attributes: ['id'],
      where: {
        isentity: true
      }
    })
    return departments.map(item => item.id)
  })()
  .then(res => {
    assetMockTpl['items|30'][0]['departmentId|1'] = res
    userMockTpl['items|30'][0]['departmentId|1'] = res
    let assetData = Mock.mock(assetMockTpl)
    let userData = Mock.mock(userMockTpl)
    let r = {}
    try {
      assetData.items.forEach(async (item) => { await Asset.create(item) })
      userData.items.forEach(async (item) => { await User.create(item) })
      r = {
        message: '添加成功！',
        code: 20000
      }
    } catch (err) {
      console.log("err_start:\nerr_name:", err.name, "\nerr_message:", err.message, "\nerr_end")
      r = err.name === 'SequelizeUniqueConstraintError' ? errors.unique : errors.insert
    }
    console.log(r)
  })