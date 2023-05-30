
'use strict';
const email1 = require('../../server/email');

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
        Users.find({where: {manager: manager},  order: 'id DESC'}, function(err, employees) {
            if (err) return cb(err);
            cb(null, employees);
          });
    }
    Users.remoteMethod('getEmployeesMng', {
        http:{path:'/getEmployees',verb:'get'},
        accepts: {arg: 'manager', type: 'string', http: {source: 'query'}},
        returns: {arg: 'employees', type: 'object'}
        
    })
    // change password
    Users.changePassword = function(id, currentPassword, newPassword, cb) {
        Users.findById(id, function(err, Users) {
          if (err) return cb(err);
          if (!Users) return cb(new Error('User not found'));
    
          Users.hasPassword(currentPassword, function(err, isMatch) {
            if (err) return cb(err);
            if (!isMatch) return cb(new Error('Incorrect password'));
    
            Users.updateAttributes({password: newPassword}, function(err, updatedMyuser) {
              if (err) return cb(err);
              cb(null, updatedMyuser);
            });
          });
        });
      };

      Users.remoteMethod('changePassword', {
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'currentPassword', type: 'string', required: true},
          {arg: 'newPassword', type: 'string', required: true}
        ],
        returns: {arg: 'Users', type: 'object'},
        http: {verb: 'patch', path: '/change-password'}
    });


    //forget password
    Users.forgetPassword=function(email,cb){
        console.log(email);
        Users.findOne({where:{email:email}},function(err,data){
            if(err) {
                cb(err);
            }
            else if(data!=null){
                    const to = email;
                    const subject = 'Password Reset';
                    const text = `Click the link  http://localhost:8080/reset?id=${data.id}` ;
                    email1.sendEmail(to, subject, text);
                    return cb(err,{"message":"Link sent to your mail"});
            }else{
              console.log(data);
                return  cb(err,{"message":"No such User Avaialble in the DB"});
            }
        })
  
       }
  
  
      Users.remoteMethod('forgetPassword',
      {
        accepts:[{arg:'email',type:'string',required: true }],
        returns:{arg:'user',type:'object'},
        http:{path:'/forgetPassword',verb:'post'}
      });

          //reset password
          Users.resetPassword=function(id,password,cb){
            // console.log(email);
             Users.findById(id,function(err,data){
                 if(err){
                     console.log(err);
                 }
                 data.updateAttribute('password',password,function(err,result){
                     if(err){
                         console.log(err);
                     }
                     console.log(result);
                 })
             return cb(err,{"message":"Successfully Reset"});
             })
       
            }
       
       
           Users.remoteMethod('resetPassword',
           {
             accepts:[{arg:'id',type:'string',required: true },{arg:'password',type:'string',required: true }],
             returns:{arg:'user',type:'object'},
             http:{path:'/resetPassword',verb:'post'}
           });
     

};
