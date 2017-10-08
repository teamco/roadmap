import {isUserLogs} from '../../../lib/utils';
import {subscribe} from '../template';
import {userLog} from '../../../model/userLog.model';
import {errorLog} from '../../../model/errorLog.model';

Template.adminDashboard.onCreated(() => subscribe(['users', 'userStatus', 'userLogs', 'errorLogs']));

Template.usersManagement.helpers({

  /**
   * @method registeredUsers
   */
  registeredUsers: () => Accounts.users.find().count(),

  /**
   * @method onlineUsers
   */
  onlineUsers: () => Accounts.users.find({'status.online': true}).count()
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

  /**
   * @method errorLogsCount
   * @returns {any}
   */
  errorLogsCount: () => {
    const user = isUserLogs();
    if (user && user._id) {
      return errorLog.find({
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

    return errorLog.find().count();
  },

  /**
   * @method errorLogsUrl
   */
  errorLogsUrl: () => _logUrl('/errors')
});