const {  DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const  modelName = 'user' 
    return {
        modelName,  
        sequelize: sequelize.define(modelName ,
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
        
            },  
            name: {
                type: DataTypes.STRING,
                allowNull: true,
        
            },
            surename: {
                type: DataTypes.STRING,
                allowNull:true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull:true,
            },
            mail: {
                type: DataTypes.STRING,
                allowNull:true,
            },
            birthday: {
                type: DataTypes.STRING,
                
            }
        
        },
        {
    
            createdAt:"created_at",
            updatedAt: "updated_at"
        })
 


    } ;
}

