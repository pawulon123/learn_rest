const express = require('express');
const {creator,  interceptor, checkModel, getRoute} =  require('../repository/rest');
const {whereId} =  require('../repository/query');
const valid = require('../valid') ;
const models = require('../db');

 
const extentions = require('../routs/extention/ext-rest');

const Rest = (function(){

    function Rest(config){
        checkModel(config.name);
        this.config = config;
        this.name = config.name;  
        
        this.router = express.Router();
        this.router.route(this.name).path = this.name;
        
        this.valid = this.isValid(); 
                
        this.exceptions =  Array.isArray(this.config.exceptionMethods) ? this.config.exceptionMethods : [];
        this.extentions =  Array.isArray(this.config.extentions) ? this.config.extentions : [];
        this.defaultMetods = ['one','all','create', 'updata','delete']; 
        this.allowMethods = [...new Set(this.defaultMetods.concat(this.extentions))]; // once call ??

    }
        Rest.prototype.run = function(){
            this.extent(); 
            this.allowMethods.forEach((method) => {
                !this.exceptions.includes(method) //if is exeption 
                && method in this //if belong to context
                && typeof this[method].constructor  === 'function'? //if is function 
                    this[method](method):
                console.log(`method ${method} was  not call for ${this.name} model`);
            });
        }
        
        Rest.prototype.extent = function(){ 
            this.extentions.forEach((methodName) =>{ //console.log(Rest.prototype);console.log(this);
                if (!(methodName in this)) {
                    const objectDefineMethod = extentions.methods(methodName);
                    if (objectDefineMethod) Rest.prototype[methodName] = objectDefineMethod.defineMethod;
                } else {
                    console.log(`method name: "${methodName}" is not available`);
                }
            });
        }
        Rest.prototype.isValid = function(){
            return Object.keys(valid).includes(this.name) ? valid[this.name] 
                : console.log(`WARNING: validation for model ${this.name}  is not defined  !!!`);
        }
        Rest.prototype.getRouter = function(){ return this.router;}

        //////////////////////////////////////////////////NEED TO SEPARATE REST///////////////////////////////////////////////
           // foward config or context ?? //
        
        Rest.prototype.all = function(selfName){
            const self = selfName;
            const route = getRoute(selfName, this.config.addRoute);      
            this.router.get(`/${route}/`, async (req, res) => { 
                res.send(
                    await models[this.name].findAll().catch(e => res.send(e))
                    .catch(interceptor(res))
                );
            });      
        }
        Rest.prototype.one = function(selfName){    
            const self = selfName;
            let route = getRoute(selfName, this.config.addRoute);
            route = route != '' ? route + '/' : '';
            this.router.get(`/${route}:id`, async (req, res) => {
            res.send(await models[this.name].findAll(whereId(req.params.id)).catch(interceptor(res)))
            });
        }
        Rest.prototype.create = function(selfName){
            const self = selfName;
            this.router.post('', async (req, res) => { 
                if (this.valid) valid[this.name](req.body);
                const model = creator(req.body, this.name);
                await models[this.name].create(model).catch(interceptor(res));
                res.sendStatus(201);
            });
        }
        Rest.prototype.updata = function(){
            this.router.put('/:id', async (req, res) => {
                if (this.valid) valid[this.name](req.body)
                const model =  creator(req.body, this.name);
                await models[this.name].update(model,whereId(req.params.id)).catch(interceptor(res));
                res.end();
            });
        }
        Rest.prototype.delete = function(){
            this.router.delete('/:id', async (req, res) => {
            await models[this.name].destroy(whereId(req.params.id)).catch(interceptor(res));
            res.end();
            });
        }
  
return Rest;
})();
module.exports = Rest;