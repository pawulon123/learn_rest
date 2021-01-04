
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//////////////////REST/////////////////////
const Rest = require('./routs')['rest'];

const MODELS = [  //name r
  {name:'user',  exceptionMethods : ['one'], extentions:['searchByName'] },
  {name:'notes'}
];

  const rests = MODELS.reduce((obj, model) => { //for each ??
    // create instance
    const rest  = new Rest(model);
    rest.run();     
    // routing
    app.use(`/${model.name}`, rest.getRouter());
    // create object output ???????????
    obj[model.name] = rest;
    return obj;
},{});
// const extentionRest = require('./routs/extention/ext-rest').methods(rests);
app.listen(3000);

// console.log(rests);







                            
                            