
   const models = require('../../db');
   const {creator, forId, interceptor,} =  require('../../repository/rest');
   
    const methods = (nameMethod) =>{

        const methods = {
        
            searchByName(selfName){ 
            
                const self = selfName;
                this.router.get('/a/b', async (req, res) => { 
                res.send(
                    await models[this.name].findAll({ where: {
                        name: 'wwwwwwwwwwwwwqqq'
                    }}).catch(e => res.send(e))
                .catch(interceptor(res)));
                }); 
            },
            answer(){   
                return {
                    defineMethod: methods[nameMethod],
                    nameMethod

                }
            }
        }
        
    return  (nameMethod in methods ) ? methods.answer() : false;
}
module.exports = {methods}