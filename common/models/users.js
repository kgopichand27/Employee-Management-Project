'use strict';

module.exports = function(Users) {

    //role mapping
    Users.afterRemote('create', function(context,data,next) {
        console.log(data);
             const userID=data.__data.id;
                Users.app.models.Role.findOne({where:{name:data.__data.Role}},function(err,role){
                    if(err) throw err;
                    console.log(role);
                    if(role!=null&&role.__data!=null){
                        Users.app.models.RoleMapping.create({
                            principalType:Users.app.models.RoleMapping.USER,
                            principalId : userID,
                            roleId:role.__data.id
                            },function(err,result){
                            if(err) throw err;
                            console.log(result);
                        });    
                    }
                })
                next();
            });

    Users.DeleteUser=function(id,cb)
       {
        //console.log(Book);
        Users.findOne({where:{id: id}},function(err,data){
            if(err) {
                cb(err);
            }
            else if(data!=null){
               console.log(data);
               Users.destroyById(id,function(err){
                if(err){
                    console.log(err);
                }
                })
                Users.app.models.RoleMapping.findOne({where:{principalId:id}},function(err,res){
                    if(err){
                        console.log(err);
                    }
                    let id1=res.__data.id;
                    console.log(res);
                    Users.app.models.RoleMapping.destroyById(id1,function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                });
               
               cb(err,{"message":"Successfully deleted"});
            }else{
                return  cb(err,{"message":"No such User Avaialble in the DB"});
            }
        })

       }
    
       Users.remoteMethod('DeleteUser',
      {
        accepts:[{arg:'id',type:'string',required: true }],
        returns:{arg:'user',type:'object'},
        http:{path:'/DeleteUser',verb:'post'}
      });
     

    //remote method to get all employees under the particular manager
    Users.getEmployeesMng = function(manager,cb){
        Users.find({where: {manager: manager}}, function(err, employees) {
            if (err) return cb(err);
            cb(null, employees);
          });
    }
    Users.remoteMethod('getEmployeesMng', {
        http:{path:'/getEmployees',verb:'get'},
        accepts: {arg: 'manager', type: 'string', http: {source: 'query'}},
        returns: {arg: 'employees', type: 'object'}
        
    })
};
