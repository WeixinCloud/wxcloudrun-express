const { Sequelize, DataTypes } = require('sequelize');

const {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_ADDRESS
} = process.env

const sequelize = new Sequelize('nodejs_demo', MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_ADDRESS,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Todo = sequelize.define('Todo', {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
    }
});

async function init() {
    await Todo.sync({ alter: true })
}

module.exports = {
    sequelize,
    init,
    Todo
}