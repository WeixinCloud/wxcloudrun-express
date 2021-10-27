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

const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    }
});

async function init() {
    await User.sync({ alter: true })
}

module.exports = {
    sequelize,
    init,
    User
}