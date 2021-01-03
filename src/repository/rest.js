
const { Op } = require("sequelize");
const models = require('../db');

const fn = {

    creator(bodyJson, modelName){
        // console.log();
        
       fn.checkModel(modelName);
        return Object.keys(models[modelName].rawAttributes).reduce((obj, key) => {
             if (key in bodyJson) obj[key] = bodyJson[key];
             return obj;
        },{})
    },
    whereAnd(obj, and = []){
        return {
            where:{
                [Op['and']]: and.map(key => {return {[key]:obj[key]}}),
            }
        }
    },
    // arrQuery(obj, arr){return arr.map(key => {return {[key]:obj[key]}})},
    interceptor(res){
        return (e) => {
            // res.sendStatus
            console.error(e);
            res.sendStatus(500);
        } 
    },
    checkModel(property, object = models){
        try {//console.log(object);
        
            if (!Object.keys(models).includes(property))
             throw new Error(`property:" ${property} " doesn't exist in object   `);
        } catch (error) {  console.error(error);}
    },
    arrToObj(arrStrings) {
        return arrStrings.reduce((obj, string) =>{
            obj[string] = null;
            return obj
        },{})
    }
}
module.exports = fn;