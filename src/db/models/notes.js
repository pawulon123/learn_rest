const {DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const  modelName = 'notes' 
    return {
        modelName,  
        sequelize: sequelize.define(modelName ,
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },  
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            value: {
                type: DataTypes.STRING,
                allowNull:true,
            },
            user_id: {
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull:true,
            },
       
        
        },
        {
    
            createdAt:"created_at",
            updatedAt: "updated_at"
        })
 


    } ;
}

