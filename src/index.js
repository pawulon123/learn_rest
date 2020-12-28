
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Rest = require('./routs')['rest'];

const MODELS = [
  {name:'user', storege:['all'], exceptionMethod : ['one']},
  {name:'notes', storege:['alss'], exceptionMethod : []}];




const routsRest = MODELS.reduce((obj, model) => {
    // create instance
    const rest  = new Rest(model);
    rest.init(model.exceptionMethod);
    // routing
    app.use(`/${model.name}`, rest.getRouter());
    // create object output
    obj[model.name] = rest;
    return obj;
},{});

const extentionRest = require('./routs/extention/ext-rest').methods(routsRest)
app.listen(3000);








                            
                            