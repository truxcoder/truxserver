const model = require('../model')
const errors = require('../dicts/errors')
const Mock = require('mockjs')
let Asset = model.Asset
let User = model.User
let Department = model.Department


let departmentList = (async () =>{
    const departments = await Department.findAll({
    attributes: ['id'],
	  where: {
	    isentity: true
	  }
	})
	return departments.map(item => item.id)
})()


Mock.Random.extend({    
	phone: function () {    
    let phonePrefixs = '18080565' // 自己写前缀哈
    return phonePrefixs + Mock.mock(/\d{3}/) //Number()
  }
})

const makeModel = () =>{
  let str = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let index1 =Math.floor(Math.random()*26)
  let index2 =Math.floor(Math.random()*26)
  let num = Math.floor(Math.random()*8999)+1000
  let model = str[index1]+str[index2]+num
  return model
}


let data = Mock.mock({
	'items|30': [{
	    'code|+1': 20200001,
	    'name|1': ['服务器','交换机','显示器','球机','枪机','硬盘录像机','PC','打印机','一体机','投影仪'],
	    'mfrs|1': ['联想', '华为', '海康','惠普','三星','戴尔','松下','索尼'],
	    'status|1': ['正常', '损坏', '维修','报废','丢失'],
	    'departmentId|1': Mock.Random.pick(departmentList),
	    // 'department|1': ['办公室', '政治处', '财务科','管理科','生产科'],
	    position:'@city',
	    model:makeModel,
	    scrap_year:'@integer(3,15)',
	    price:'@float(1000,100000)',
	    manager: '@cname',
	    buy_time: '@date',
	    use_time: '@date',
    }]
})

let userData = Mock.mock({
	'items|30': [{
	    'code|+1': 5159000,
	    name: '@cname',
	    'role_id|+1': 10000,
	    phone: '@phone',
	    'status|1': '@boolean()',
	    'departmentId|1': departmentList,
	    create_time: '@date',
    }]
})


function randomString(e) {  
	e = e || 32;
	let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
	a = t.length,
	n = "";
	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n
}

function randomNum(Min,Max)
{
	let Range = Max - Min;
	let Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}

//添加虚拟信息
const fakeData = async (ctx, next) => {
	if(ctx.request.body.passwd!='truxcoder'){
		return
	}
	let postInfo = data.items
	let userInfo = userData.items
    let r = {}
    console.log(userData.items)
    try {
        postInfo.forEach(async (item) => { await Asset.create(item)} )
        userInfo.forEach(async (item) => { await User.create(item)} )
        r = {
            message: '添加成功！',
            code: 20000
        }
    } catch(err){
        console.log("err_start:\nerr_name:",err.name,"\nerr_message:",err.message,"\nerr_end")
        r = err.name==='SequelizeUniqueConstraintError'?errors.unique:errors.insert
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const getFakeData = async (ctx, next) => {
    let r = data.items
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

module.exports = {
    'POST /asset/fake': fakeData,
    'GET /asset/getfake': getFakeData,
}