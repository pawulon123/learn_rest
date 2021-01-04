
const { Op } = require("sequelize");

const fn = {

    whereId(id){
        return { 
            where:{id}
        }
    }
    
  

}
module.exports = fn;