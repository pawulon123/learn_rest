

const express = require('express');
const {creator, forId, interceptor, PropertyInObject: checkModel, arrToObj} =  require('../repository/rest');
const valid = require('../valid') ;
const models = require('../db');
const extentions = require('../routs/extention/ext-rest')

const Rest = (function(){
    function Rest(config){
        checkModel(config.name);
        this.config = config;
        this.name = config.name;  
        
        this.router = express.Router();
        this.router.route(this.name).path = this.name
        
        this.valid = this.isValid(); 
                
        this.exception = this.config.exception || [];
        this.extentions = this.config.extentions || [];

        const defaultMetods = ['one','all','create', 'updata']; 
        this.allowMethods = defaultMetods.concat(this.extentions);

    }
        Rest.prototype.run = function(){
            this.extention();
            this.allowMethods.forEach((method) => {
                if (!this.exception.includes(method) && method in this) {
                    this[method](method);
                }else{
                    console.log(`method ${method} can not call`);
                }
            });
        }
        Rest.prototype.extention = function(){ 
            this.extentions.forEach((methodName) =>{
                const defineMethod = extentions.methods(methodName);
                    if (defineMethod) Rest.prototype[methodName] = defineMethod;
                });
        }
        Rest.prototype.isValid = function(){
            return Object.keys(valid).includes(this.name) ? valid[this.name] 
                : console.log(`WARNING: validation for model ${this.name}  is not defined  !!!`);
        }
        Rest.prototype.getRouter = function(){
            return this.router;
        }
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
                res.send(await models[this.name].findAll(forId(req.params.id)).catch(interceptor(res)))
            });
        }   
        Rest.prototype.create = function(selfName){
            const self = selfName;
            this.router.post('', async (req, res) => { 
                if (this.valid) valid[this.name](req.body)
                
                const user =  creator(req.body, this.name);
                await models[this.name].create(user).catch(interceptor(res));
                res.sendStatus(201);
            });
        }
        return Rest;
})();
//  const rest =  new Rest('user');
//  rout.all();


// const user = require('../db')['user'];

// router.get('/:id', async (req, res) => {
//     res.send(await user.findAll(forId(req.params.id)).catch(interceptor(res)))
// });
// router.post('', async (req, res) => {
//     validUser(req.body);
//     await user.create(creator(req.body, 'user')).catch(interceptor(res));
//     res.sendStatus(201);
// });
// router.put('/:id', async (req, res) => {
//     validUser(req.body);
//     await user.update(creator(req.body,'user'),forId(req.params.id)).catch(interceptor(res));
//     res.sendStatus(200);
// });
// router.delete('/:id', async (req, res) => {
//     await res.status(200).send((req.params.id).toString().catch(interceptor(res)))
// });
module.exports = Rest;