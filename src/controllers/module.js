const model = require('../model')
const errors = require('../dicts/errors')
let Module = model.Module

const getModuleList = async (ctx, next) => {
    let r = {}
    const modules = await Module.findAll({
        order: [
            ['order', 'ASC']
        ]})
    r = {
        code: 20000,
        data: modules
    }
    // 设置Content-Type:
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

//添加模块
async function addModule(ctx, next){
    const postInfo = ctx.request.body
    console.log("postInfo:",postInfo)
    let r = {}
    try {
        let m = await Module.create(postInfo)
        console.log("Module:",m.dataValues)
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
// //更新部门顺序
// const updateOrder = async (ctx, next) => {
//     const postInfo = ctx.request.body
//     let count = 0
//     let result
//     let r = {}
//     try {
//         for (i of postInfo.orderData) {
//             console.log("更新：",i,"\n")
//             result = await Department.update({ order: i.order}, { where: { id: i.id } })
//             count += result[0]
//         }
//         r = {
//             message: '成功更新数据'+count+'条！',
//             code: 20000
//         }
//     } catch(err){
//         console.log("err:",err)
//         r = err.name==='SequelizeUniqueConstraintError'?errors.unique:errors.update
//     }
//     ctx.response.type = 'application/json'
//     ctx.response.body = r
// }

const updateModule = async (ctx, next) => {
    const postInfo = ctx.request.body
    let r = {}
    let m = await Module.findByPk(postInfo.id)
    if(m){
        try {
            Object.assign(m, postInfo)
            await m.save()
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


const deleteModule= async (ctx, next) => {
    const req = ctx.request.body
    console.log('id：',req.id)
    let r = {}
    try {
        let res = await Module.destroy({
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


module.exports = {
    'GET /module/list': getModuleList,
    'POST /module/add': addModule,
    'POST /module/update': updateModule,
    'POST /module/delete': deleteModule,
    // 'POST /department/order': updateOrder,
}
