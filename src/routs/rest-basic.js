

const express = require('express');

const {creator, forId, interceptor, PropertyInObject, arrToObj} =  require('../repository/rest');
const valid = require('../valid') ;
const models = require('../db');
const extentions = require('../routs/extention/ext-rest')
const Rest = (function(){
    function Rest(config){
        PropertyInObject(config.name);
        this.config = config;
        this.name = config.name;  
        this.router = express.Router();
        this.router.route(this.name).path = this.name
        this.valid = Object.keys(valid).includes(this.name) ? true : false;
        this.allowMethods = ['one','all','create', 'updata'].concat(this.config.extentions);

        // this.storege  = arrToObj(this.allowMethods);
    }
        Rest.prototype.run = function(exception = []){
           this.extention();
            this.allowMethods.forEach((method) => {
                if (!exception.includes(method) && method in this) {
                    this[method](method);
                }else{
                    console.log(`method ${method} can not call` );
                }
            });
        }
        Rest.prototype.extention = function(){ 
            if ('extentions' in  this.config && Array.isArray(this.config.extentions)){ ///?????????
                this.config.extentions.forEach((methodName) =>{
                    Rest.prototype[methodName] = extentions.methods(methodName);
                });
            }
        }
        Rest.prototype.getRouter = function(){
            return this.router;
        }
        Rest.prototype.all = function(selfName){

            const self = selfName;
            this.router.get('/', async (req, res) => { 
                res.send(
                    await models[this.name].findAll().catch(e => res.send(e))
                .catch(interceptor(res)));
                    if (!('storege' in this.config)){
                        console.log(' storage : none');
                        
                    }else{
                        if (this.config.storege.includes(self)) {
                            console.log(' storage');
                        }
                    }
                
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
                this.valid ? valid[this.name](req.body) : console.log('WARNING: validation was not done !!!');
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