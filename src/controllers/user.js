const model = require('../model')
const errors = require('../dicts/errors')
const dayjs = require('dayjs')
// const {formatTime} = require('../utils/index')
let Asset = model.Asset
let User = model.User
let Department = model.Department

Department.hasMany(User)
User.belongsTo(Department)
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const fn_login = async (ctx, next) => {
    const { username } = ctx.request.body
    const token = tokens[username]
    let r = {}
    if (!token) {
        r = errors.passwdIncrrect
    } else {
        r = {
            code: 20000,
            data: token
        }
    }
    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const fn_logout = async (ctx, next) => {
    r = {
        code: 20000,
        data: 'success'
    }
    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const fn_userinfo = async (ctx, next) => {
    const { token } = ctx.query
    const info = users[token]
    let r = {}
    if (!info) {
        r = {
            code: 50008,
            message: 'Login failed, unable to get user details.'
        }
    } else {
        r = {
            code: 20000,
            data: info
        }
    }
    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const fn_getUserlist = async (ctx, next) => {
    const req = ctx.query
    console.log('req:',req)
    let users = null
    let r = {}
    users = await User.findAll({
        include: Department,
        where: req,
        order: [
            ['code', 'ASC']
        ]})
    r = {
        code: 20000,
        data: {
            total: users.length,
            items: users
        }
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const fn_getTest = async (ctx, next) => {
    const { id } = ctx.query
    assets = await Asset.findByPk(id)
    let result = assets

    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = {'类型是：':result}
}

//添加用户
const fn_addUser = async (ctx, next) => {
    const postInfo = ctx.request.body
    postInfo.create_time = dayjs().format('YYYY-MM-DD')
    console.log(postInfo)
    let r = {}
    try {
        let user= await User.create(postInfo)
        console.log("user:",user.dataValues)
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
//编辑资产
const fn_updateUser = async (ctx, next) => {
    const postInfo = ctx.request.body
    let r = {}
    let user = await User.findByPk(postInfo.id)
    if(user){
        try {
            Object.assign(user,postInfo)
            await user.save()
            r = {
                message: '更新数据成功！',
                code: 20000
            }
        } catch(err){
            r = err.name==='SequelizeUniqueConstraintError'?errors.unique:errors.update
        }
    } else {
        r = errors.noData
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

//删除用户
const fn_deleteUser = async (ctx, next) => {
    const req = ctx.request.body
    console.log('id：',req.id)
    let r = {}
    try {
        let res = await User.destroy({
            where: { id: req.id }
        })
        r = {
            message: `成功删除 ${res} 条数据！`,
            code: 20000,
        }
    } catch(err) {
        r = errors.delete
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

const fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || '', password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'POST /signin': fn_signin,
    'POST /user/login': fn_login,
    'POST /user/logout': fn_logout,
    'POST /user/add': fn_addUser,
    'POST /user/update': fn_updateUser,
    'POST /user/delete': fn_deleteUser,
    'GET /user/info': fn_userinfo,
    'GET /user/userlist': fn_getUserlist,
};

//http://123.207.32.32:8000