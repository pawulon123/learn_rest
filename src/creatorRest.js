const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Rest = require('./routs')['rest'];

// const routsRest = NAMES_INIT.reduce((obj, name) => {
//     const rest  = new Rest(name);
//     rest.init();
//     app.use(`/${name}`, rest.getRouter());
//     obj[name] = rest;
//     return obj;
// },{});
const creatorRest = (names_init) => {
    return (apiRest)=>{

   
    return names_init.reduce((obj, name) => {
        // create instance
        const rest  = new Rest(name);
        rest.init();
        // creatte router
        apiRest(`/${name}`, rest.getRouter());
        // crate object output
        obj[name] = rest;

        return obj;
    },{});


}
}
module.exports = creatorRest