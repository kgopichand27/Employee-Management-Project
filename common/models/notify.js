'use strict';

module.exports = function(Notify) {
    Notify.getNotifiesMng = function(manager,cb){
        Notify.find({where: {manager: manager}}, function(err, employees) {
            if (err) return cb(err);
            cb(null, employees);
          });
    }
    Notify.remoteMethod('getNotifiesMng', {
        http:{path:'/getNotifiesFromMng',verb:'get'},
        accepts: {arg: 'manager', type: 'string', http: {source: 'query'}},
        returns: {arg: 'employees', type: 'object'}
        
    })

};
