const express = require('express');
const {creator,  interceptor, checkModel, whereAnd, ifIsnTArrayGetEmpty} =  require('../repository/rest');
const valid = require('../valid') ;
const models = require('../db');
const where = require('../repository/query/where')() 
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
        this.allowMethods = this.defaultMetods.concat(this.extentions);

    }
        Rest.prototype.run = function(){
            this.extention(); // overwrites existing methods with the same name
            this.allowMethods.forEach((method) => {
                !this.exceptions.includes(method) && method in this && !Object.keys(this).includes(method) && typeof this[method].constructor  === 'function'? 
                    this[method](method):
                    console.log(`method ${method} was  not call for ${this.name} model `);
            });
        }
        Rest.prototype.extention = function(){ 
            this.extentions.forEach((methodName) =>{
                const objectDefineMethod = extentions.methods(methodName);
                if (objectDefineMethod && typeof objectDefineMethod.defineMethod.constructor  === 'function' ) Rest.prototype[methodName] = objectDefineMethod.defineMethod;
            });
        }
        Rest.prototype.isValid = function(){
            return Object.keys(valid).includes(this.name) ? valid[this.name] 
                : console.log(`WARNING: validation for model ${this.name}  is not defined  !!!`);
        }
        Rest.prototype.getRouter = function(){ return this.router;}

        ///////////////////////////////////////////////////REST///////////////////////////////////////////////
        Rest.prototype.all = function(selfName){
            const self = selfName;
            this.router.get('/', async (req, res) => { 
                res.send(
                    await models[this.name].findAll().catch(e => res.send(e))
                    .catch(interceptor(res))
                );
            });      
        }
        Rest.prototype.one = function(selfName){    
            const self = selfName;
            this.router.get('/:id', async (req, res) => {
                res.send(await models[this.name].findAll(whereAnd({object:req.params, keys:['id'], operator: 'and'})).catch(interceptor(res)))
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
                await models[this.name].update(model,whereAnd({object:req.params, keys:['id'], operator: 'and'})).catch(interceptor(res));
                res.end();
            });
        }
        Rest.prototype.delete = function(){
            this.router.delete('/:id', async (req, res) => {
            await models[this.name].destroy(whereAnd({object:req.params, keys:['id'], operator: 'and'})).catch(interceptor(res));
            res.end();
            });
        }
  
return Rest;
})();
module.exports = Rest;