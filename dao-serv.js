const seneca = require('seneca')();
const dao_plugin = require('./dao-plugin');
const PORT = 3000;

seneca.use(dao_plugin);
seneca.listen(PORT,()=>{
  console.log('server on ' + PORT + '......');
});
