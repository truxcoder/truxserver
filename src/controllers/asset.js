const model = require('../model')
const errors = require('../dicts/errors')
let Asset = model.Asset

const fn_getAssetlist = async (ctx, next) => {
    let currentPage =1
    let pageSize = 10
    let offset = 0
    let assets = null
    let r = {}
    if (ctx.query.queryMeans === 'backend'){
        currentPage = parseInt(ctx.query.currentPage) || 1
        pageSize = parseInt(ctx.query.pageSize) || 10
        offset = (currentPage-1)*pageSize
        assets = await Asset.findAndCountAll({
            order: [
                ['code', 'DESC'] 
            ],
            limit:pageSize,
            offset
        })
        r = {
            code: 20000,
            data: {
                total: assets.count,
                items: assets.rows
            }
        }
    } else {
        assets = await Asset.findAll({
            order: [
                ['code', 'DESC']
            ],
        })
        r = {
            code: 20000,
            data: {
                total: assets.length,
                items: assets
            }
        }
    }

    // 设置Content-Type:
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

//添加资产
const fn_addAsset = async (ctx, next) => {
    const postInfo = ctx.request.body
    console.log("postInfo:",postInfo)
    let r = {}
    try {
        let asset= await Asset.create(postInfo)
        console.log("asset:",asset.dataValues)
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
const fn_updateAsset = async (ctx, next) => {
    const postInfo = ctx.request.body
    let r = {}
    let asset = await Asset.findByPk(postInfo.id)
    if(asset){
        try {
            // asset.code =  postInfo.code
            // asset.name =  postInfo.name
            // asset.mfrs =  postInfo.mfrs
            // asset.model =  postInfo.model
            // asset.buy_time =  postInfo.buy_time
            // asset.use_time =  postInfo.use_time
            // asset.status=  postInfo.status
            // asset.department=  postInfo.department
            // asset.position=  postInfo.position
            // asset.manager=  postInfo.manager
            // 用Object.assign把postInfo对象里的属性快速赋值到asset里。
            Object.assign(asset,postInfo)
            await asset.save()
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

//删除资产
const fn_deleteAsset = async (ctx, next) => {
    const req = ctx.request.body
    console.log('id：',req.id)
    let r = {}
    asset = await Asset.findByPk(req.id)
    if(asset){
        try {
            await asset.destroy()
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
    'GET /': fn_index,
    'GET /asset/list': fn_getAssetlist,
    'GET /asset/gettest': fn_getTest,
    'POST /asset/add': fn_addAsset,
    'POST /asset/update': fn_updateAsset,
    'POST /asset/delete': fn_deleteAsset,
    // 'GET /home/multidata': fn_home_multidata,
    // 'GET /home/goodsdata': fn_goodsdata,
};

//http://123.207.32.32:8000