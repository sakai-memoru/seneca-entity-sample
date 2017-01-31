const ptnGetEntity  = 'role:dao,cmd:getEntity';
const ptnSaveEntity = 'role:dao,cmd:saveEntity';
//const seneca = require('seneca')();

function dao(options){
  //console.log(this);
  this.add(ptnGetEntity,(msg_obj,response_cb)=>{
    this.make(msg_obj.entityName).load$(msg_obj.id,response_cb);
  });
  this.add(ptnSaveEntity,(msg_obj,response_cb)=>{
    this.make(msg_obj.entityName).data$(msg_obj.data).save$(response_cb);
  });

}

module.exports = dao;
