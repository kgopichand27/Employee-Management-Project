'use strict';

module.exports = function(Absence) {
  // accepting the leave request
  Absence.accept = (id, next) => {
    Absence.findOne({where: {id: id}}, (err, result) => {
      if (err) return next(err);
      else if (result != null) {
        result.status = 'accepted';
        result.save();
        Absence.app.models.Users.findOne({where: { id: result.userId}}, (err, data) =>{
          let sl;
          let vl;
          if (err)          {
            return next(err);
          } else {
            if (result.typeof == 'sick') {
              sl = data.sickLeaves - result.leaves;
            } else if (result.typeof == 'vacation') {
              vl = data.vacationLeaves - result.leaves;
            }
            data.sickLeaves = sl;
            data.vacationLeaves = vl;
            data.save();
            Absence.app.models.Users.update({ id: data.id}, {sickLeaves: sl, vacationLeaves: vl}, (err, res) =>{
              if (err) return next(err);
              console.log(res);
            });
          }
        });

        return next(null, {response: 'Request accepted successfully', instance: result});
      } else {
        return next(err);
      }
    });
  };

  Absence.remoteMethod('accept', {
    accepts: [
        {arg: 'userID', type: 'string', required: true },
    ],
    returns: {args: Absence, type: 'object'},
    http: {verb: 'post', path: '/acceptRequest'},
  });


  // rejecting the leave request
  Absence.reject = (id, next) => {
    Absence.findOne({where: {id: id}}, (err, result) => {
      if (err) return next(err);
      else if (result != null) {
        result.status = 'rejected';
        result.save();
        return next(null, {response: 'Request rejected successfully', instance: result});
      }
      return next(err);
    });
  };
  Absence.remoteMethod('reject', {
    accepts: [
        {arg: 'id', type: 'string', required: true },
    ],
    returns: {args: Absence, type: 'object'},
    http: {verb: 'post', path: '/rejectRequest'},
  });

// Get all employee leave requests to their corresponding manager based on managerId
Absence.getEmployeesMng = function(manager,cb){
  Absence.find({where: {managerId: manager}, order: 'id DESC'}, function(err, absences) {
      if (err) return cb(err);
      cb(null, absences);
    });
}
Absence.remoteMethod('getEmployeesMng', {
  http:{path:'/getAbsenceRequests',verb:'get'},
  accepts: {arg: 'manager', type: 'string',required: true , http: {source: 'query'}},
  returns: {arg: 'absences', type: 'object'}
  
})
// remote method to get all employee leave requests
Absence.getEmployeeLeaves = function(id,cb){
  const date = new Date();
  Absence.find({where: {userId: id}, order: 'id DESC'}, function(err, absences) {
      if (err) return cb(err);
      cb(null, absences);
    });
}
Absence.remoteMethod('getEmployeeLeaves', {
  http:{path:'/getEmployeeLeaveRequests',verb:'get'},
  accepts: {arg: 'id', type: 'string',required: true , http: {source: 'query'}},
  returns: {arg: 'absences', type: 'object'}
  
})

// leave request pending status count => Admin
Absence.pendingCount = function(cb) {
  Absence.count({status: 'pending'}, function(err, count) {
    if (err) return cb(err);
    cb(null, count);
  });
};

Absence.remoteMethod('pendingCount', {
  returns: {arg: 'count', type: 'number'},
  http: {verb: 'get', path: '/pending-count'}
});

// leave request pending status count => Manager returning object
Absence.pendingCountForManager = function(managerId,cb) {
  console.log('managerId', managerId);
  console.log('cb', cb);
  Absence.find({ where :{managerId:managerId, status: 'pending'} }, function(err, countmng) {
    if (err) return cb(err);
    console.log('countmng', countmng);
    console.log(arguments);
    cb(null, countmng);
  });
};

// leave requests pending count for manager
Absence.remoteMethod('pendingCountForManager', {
  accepts: {arg: 'managerId', type: 'string',required: true , http: {source: 'query'}},
  returns: {arg: 'countmng', type: 'number'},
  http: {verb: 'get', path: '/pending-count-mng'}
});

Absence.deleteAllByName = function(userId, cb) {
  Absence.destroyAll({userId: userId}, function(err) {
    if (err) return cb(err);
    cb();
  });
};

Absence.remoteMethod('deleteAllByName', {
  accepts: {arg: 'userId', type: 'string', required: true, http: {source: 'query'}},
  returns: {type: 'object', root: true},
  http: {verb: 'delete', path: '/deleteall'}
});

// remote method to show all leave requests of an employee
// filterd by endDate is >= currentDate
Absence.requestedLeaves = function(userId, cb) {
  const currentDate = new Date();
  Absence.find({
    where: {
      and: [
        { userId: userId },
        { endDate: { gte: currentDate }}
        
      ]
    },
    order: 'id DESC'
  }, function(err, absences) {
    if (err) return cb(err);
    cb(null, absences);
  });
};

Absence.remoteMethod('requestedLeaves', {
  accepts: { arg: 'userId', type: 'string', required: true },
  returns: { arg: 'absences', type: 'object' },
  http: { verb: 'get', path: '/requested-leaves' }
});

};
