const { Sequelize, DataTypes } = require('sequelize');

const {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_ADDRESS
} = process.env

const sequelize = new Sequelize('nodejs_demo', MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_ADDRESS,
    dialect: 'mysql'
});

const Counter = sequelize.define('Counter', {
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

async function init() {
    await Counter.sync({ alter: true })
}

module.exports = {
    sequelize,
    init,
    Counter
}