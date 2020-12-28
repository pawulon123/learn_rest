
const models = require('../db')
const fn = {

    creator(bodyJson, modelName){
        // console.log();
        
       fn.PropertyInObject(modelName);
        return Object.keys(models[modelName].rawAttributes).reduce((obj, key) => {
             if (key in bodyJson) obj[key] = bodyJson[key];
             return obj;
        },{})
    },
    forId(id){
        return {
            where:{
                id:id
            }
        }
    },
    interceptor(res){
        return (e) => {
            // res.sendStatus
            console.error(e);
            res.sendStatus(500);
        } 
    },
    PropertyInObject(property, object = models){
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