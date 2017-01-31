const expect = require('chai').expect;
const Seneca = require('seneca');

function prepare_seneca(fin){
  return Seneca({log:'test'})
    //.test(fin,'print')
    .test(fin)
    .use(require('seneca-basic'))
    .use(require('seneca-entity'))
    .use(require('../dao-plugin'));
}

describe('dao-plugin',()=>{
  describe('unit test',()=>{
    it('should save a entity',(done)=>{
      // Arrange
      const seneca = prepare_seneca(done);
      const ptnSaveEntity = 'role:dao,cmd:saveEntity';
      const data = {
        'key' : '12345',
        'name' : 'sakai',
        'email' : 'sakai.memoru@gmail.com',
        'home' : 'toyozumi'
      };
      const entityName = 'userinfo';
      let param = {data: data,entityName:entityName};
      // Act
      seneca.act(ptnSaveEntity,param,(err,ent_)=>{
        // Assert
        console.log(ent_);
        expect(ent_.name).to.equal(data.name);
        done();
      });
    });
  
  });

  describe('unit test',()=>{
    it('should load an entity after saving an entity',(done)=>{
      // Arrange
      const seneca = prepare_seneca(done);
      const ptnSaveEntity = 'role:dao,cmd:saveEntity';
      const ptnGetEntity  = 'role:dao,cmd:getEntity';
      const data = {
        'key' : '67890',
        'name' : 'sakai',
        'busStop' : 'koto-ku yakusho mae',
        'email' : 'sakai.memoru@gmail.com',
        'home' : 'toyo-cho'
      };
      const entityName = 'userinfo';
      let param = {data: data,entityName:entityName};
      // Act
      seneca.act(ptnSaveEntity,param,(err,ent_)=>{
        // Assert
        //console.log(ent_);
        seneca.act(ptnGetEntity,{id:ent_.id,entityName:entityName},(err,ent__)=>{
          console.log(ent__);
          expect(ent__.name).to.equal(data.name);
          done();
        });
      });
    });
  
  });

});

