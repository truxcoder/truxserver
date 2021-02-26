const model = require('../model')
const errors = require('../dicts/errors')
let Asset = model.Asset
let Department = model.Department
Department.hasMany(Asset)
Asset.belongsTo(Department)

const fn_getAssetlist = async (ctx, next) => {
  let params = { ...ctx.query }
  if (params.queryMeans) {
    delete params.queryMeans
  }
  if (params.currentPage) {
    delete params.currentPage
  }
  if (params.pageSize) {
    delete params.pageSize
  }
  console.log('query:', ctx.query)
  console.log('params:', params)
  let assets = null
  let r = {}
  if (ctx.query.queryMeans === 'backend') {
    const currentPage = parseInt(ctx.query.currentPage) || 1
    const pageSize = parseInt(ctx.query.pageSize) || 10
    const offset = (currentPage - 1) * pageSize
    assets = await Asset.findAndCountAll({
      include: Department,
      where: params,
      order: [
        ['code', 'DESC']
      ],
      limit: pageSize,
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
      include: Department,
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
  ctx.response.body = { '类型是：': result }
}

//添加资产
const fn_addAsset = async (ctx, next) => {
  const postInfo = ctx.request.body
  console.log("postInfo:", postInfo)
  let r = {}
  try {
    let asset = await Asset.create(postInfo)
    console.log("asset:", asset.dataValues)
    r = {
      message: '添加成功！',
      code: 20000
    }
  } catch (err) {
    console.log("err_start:\nerr_name:", err.name, "\nerr_message:", err.message, "\nerr_end")
    r = err.name === 'SequelizeUniqueConstraintError' ? errors.unique : errors.insert
  }
  ctx.response.type = 'application/json'
  ctx.response.body = r
}
//编辑资产
const fn_updateAsset = async (ctx, next) => {
  const postInfo = ctx.request.body
  let r = {}
  let asset = await Asset.findByPk(postInfo.id)
  if (asset) {
    try {
      // 用Object.assign把postInfo对象里的属性快速赋值到asset里。
      Object.assign(asset, postInfo)
      let res = await asset.save()
      let department = await Department.findByPk(res.dataValues.departmentId)
      res.dataValues.department = department.dataValues
      console.log(res.dataValues)
      r = {
        message: '更新数据成功！',
        code: 20000,
        modifiedRow: res.dataValues
      }
    } catch (err) {
      r = err.name === 'SequelizeUniqueConstraintError' ? errors.unique : errors.update
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
  console.log('id：', req.id)
  let r = {}
  try {
    let res = await Asset.destroy({
      where: { id: req.id }
    })
    r = {
      message: `成功删除 ${res} 条数据！`,
      code: 20000,
    }
  } catch (err) {
    r = errors.delete
  }
  ctx.response.type = 'application/json'
  ctx.response.body = r
}

module.exports = {
  'GET /asset/list': fn_getAssetlist,
  'GET /asset/gettest': fn_getTest,
  'POST /asset/add': fn_addAsset,
  'POST /asset/update': fn_updateAsset,
  'POST /asset/delete': fn_deleteAsset,
  // 'GET /home/multidata': fn_home_multidata,
  // 'GET /home/goodsdata': fn_goodsdata,
};

//http://123.207.32.32:8000