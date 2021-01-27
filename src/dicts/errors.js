const errors ={
    unique: {
        message: '添加失败！请检查编号或其他唯一性字段是否重复!',
        code:80405
    },
    passwdIncrrect: {
        code: 60204,
        message: '帐号或密码错误！'
    },
    getUser: {
        code: 50008,
        message: '登录失败，无法取得用户信息！'
    },
    insert: {
        message: '添加失败！',
        code: 80404
    },
    update: {
        message: '更新失败！',
        code: 80404
    },
    delete: {
        message: '删除失败！',
        code: 80404
    },
    noData: {
        message: '未查询到数据！',
        code: 80404
    }
}

module.exports = errors