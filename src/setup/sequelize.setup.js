import {Sequelize} from 'sequelize';

const config = require("config");

const sequelize = new Sequelize(config.dbUrl);
export default sequelize;
