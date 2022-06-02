const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init({
    // add properites here, ex:
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    description: {
        type:DataTypes.TEXT
    },
    playerCount:{
        type:DataTypes.INTEGER
    },
    weight:{
        type:DataTypes.FLOAT
    },
},{
    sequelize
});

module.exports=Game