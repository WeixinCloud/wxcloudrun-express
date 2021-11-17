const { Sequelize, DataTypes } = require('sequelize');

// 从环境变量中读取数据库配置
const {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_ADDRESS
} = process.env

// 建立数据库连接，初始化 ORM
const sequelize = new Sequelize('nodejs_demo', MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_ADDRESS,
    dialect: 'mysql'
});

// 定义数据模型
const Counter = sequelize.define('Counter', {
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

// 数据库初始化方法
async function init() {
    await Counter.sync({ alter: true })
}

// 导出初始化方法和模型
module.exports = {
    init,
    Counter
}