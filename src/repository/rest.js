

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
    // arrQuery(obj, arr){return arr.map(key => {return {[key]:obj[key]}})},
    interceptor(res){
        return (e) => {
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
    },
    getRoute(methodName, routes = []){
    
        if (Array.isArray(routes)) {
            const route = routes.filter(r => r.methods.includes(methodName));
            return route.length ? route[0].route : '';
            
        }else if (typeof routes === 'string') {
            return routes;
        }else{
            return ''
        }
    }
   

}
module.exports = fn;