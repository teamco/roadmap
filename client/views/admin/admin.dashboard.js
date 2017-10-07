import {isUserLogs} from '../../../lib/utils';
import {userLog} from '../../../model/userLog.model';

Template.usersDashboard.helpers({
  registeredUsers: function() {
    return Accounts.users.find().count();
  },
  onlineUsers: function() {
    return Accounts.users.find({'status.online': true}).count();
  }
});

/**
 * @method _logUrl
 * @param {string} path
 * @private
 */
function _logUrl(path) {
  const user = isUserLogs();
  return user ?
      ('/dashboard/users/' + user._id + path) :
      ('/dashboard' + path);
}

Template.userLogs.helpers({

  /**
   * @method userLogsCount
   * @returns {any}
   */
  userLogsCount: () => {
    const user = isUserLogs();
    return user ?
        userLog.find({userId: user._id}).count() :
        userLog.find().count();
  },

  /**
   * @method userLogsUrl
   */
  userLogsUrl: () => _logUrl('/logs')
});

Template.errorLogs.helpers({
  errorLogsCount: function() {

    var user = isUserLogs();

    if (user) {

      if (user._id) {

        return ErrorLog.find({
          userLogId: {
            $in: _.map(
                userLog.find({userId: user._id}).fetch(),
                function(log) {
                  return log._id;
                }
            )
          }
        }).count();
      }
    }

    return ErrorLog.find().count();
  },

  errorLogsUrl: function() {
    return _logUrl('/errors');
  }
});

Meteor.subscribe('users');
Meteor.subscribe('userStatus');
Meteor.subscribe('userLogs');
// Meteor.subscribe('errorLogs');