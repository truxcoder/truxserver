const model = require('../model')
const errors = require('../dicts/errors')
let Asset = model.Asset
let User = model.User
let Department = model.Department
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }

// const fn_login = async (ctx, next) => {
//     const { username } = ctx.request.body
//     const token = tokens[username]
//     let r = {}
//     if (!token) {
//         r = {
//             code: 60204,
//             message: 'Account and password are incorrect.'
//         }
//     } else {
//         r = {
//             code: 20000,
//             data: token
//         }
//     }
//     // 设置Content-Type:
//     ctx.response.type = 'application/json'
//     ctx.response.body = r
// }

// const fn_userinfo = async (ctx, next) => {
//     const { token } = ctx.query
//     const info = users[token]
//     let r = {}
//     if (!info) {
//         r = {
//             code: 50008,
//             message: 'Login failed, unable to get user details.'
//         }
//     } else {
//         r = {
//             code: 20000,
//             data: info
//         }
//     }
//     // 设置Content-Type:
//     ctx.response.type = 'application/json'
//     ctx.response.body = r
// }

// const fn_getUserlist = async (ctx, next) => {
//     let users = null
//     let r = {}
//     users = await User.findAll({
//         order: [
//             ['code', 'ASC']
//         ]})
//     r = {
//         code: 20000,
//         data: {
//             total: users.length,
//             items: users
//         }
//     }
//     ctx.response.type = 'application/json'
//     ctx.response.body = r
// }

const getDepartmentList = async (ctx, next) => {
    let r = {}
    const departments = await Department.findAll({
        order: [
            ['order', 'ASC']
        ]})
    r = {
        code: 20000,
        data: departments
    }
    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

//添加部门
async function addDepartment(ctx, next){
    const postInfo = ctx.request.body
    console.log("postInfo:",postInfo)
    let r = {}
    try {
        let department= await Department.create(postInfo)
        console.log("department:",department.dataValues)
        r = {
            message: '添加成功！',
            code: 20000
        }
    } catch(err){
        r = err.name==='SequelizeUniqueConstraintError'?errors.unique:errors.insert
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}
//更新部门顺序
const updateOrder = async (ctx, next) => {
    const postInfo = ctx.request.body
    let count = 0
    let result
    let r = {}
    try {
        for (i of postInfo.orderData) {
            console.log("更新：",i,"\n")
            result = await Department.update({ order: i.order}, { where: { id: i.id } })
            count += result[0]
        }
        r = {
            message: '成功更新数据'+count+'条！',
            code: 20000
        }
    } catch(err){
        console.log("err:",err)
        r = err.name==='SequelizeUniqueConstraintError'?errors.unique:errors.update
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}
//编辑部门
const updateDepartment = async (ctx, next) => {
    const postInfo = ctx.request.body
    let r = {}
    let department = await Department.findByPk(postInfo.id)
    if(department){
        try {
            Object.assign(department,postInfo)
            await department.save()
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

//删除部门
const deleteDepartment = async (ctx, next) => {
    const req = ctx.request.body
    console.log('id：',req.id)
    let r = {}
    department = await Department.findByPk(req.id)
    if(department){
        try {
            await department.destroy()
            r = {
                message: '删除数据成功！',
                code: 20000
            }
        } catch(err){
            console.log("err_start:\nerr_name:",err.name,"\nerr_message:",err.message,"\nerr_end")
            r = errors.delete
        }
    } else {
        r = errors.noData
    }
    ctx.response.type = 'application/json'
    ctx.response.body = r
}



module.exports = {
    'GET /department/departmentlist': getDepartmentList,
    'POST /department/add': addDepartment,
    'POST /department/update': updateDepartment,
    'POST /department/delete': deleteDepartment,
    'POST /department/order': updateOrder,
}
