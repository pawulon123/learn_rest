
   const models = require('../../db');
   const {creator, forId, interceptor,} =  require('../../repository/rest');
   const methods = (nameMethod) =>{

    const methods = {
      searchByName(selfName){
        const self = selfName;
        this.router.get('/a/b', async (req, res) => { 
          res.send(
              await models[this.name].findAll().catch(e => res.send(e))
          .catch(interceptor(res)));
              if (!('storage' in this.config)){
                  console.log(' storage : none');
                  
              }else{
                  if (this.config.storage.includes(self)) {
                      console.log(' storage');
                  }
              } 
          
      }); 
        
        }
    }
    return methods[nameMethod]
      
}
module.exports = {methods}