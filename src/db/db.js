
const objectConnect = require('./connect/connect');
const modelsClous = [
      require('./models/user'),
      require('./models/notes')
];

module.exports = modelsClous.reduce((obj, model)=>{
      const m = model(objectConnect);
      const modelName = m.modelName;
      obj[modelName] = m.sequelize;
      return obj;
},{});
