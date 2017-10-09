import {isUserLogs} from '../../../lib/utils';
import {subscribe} from '../template';
import {userLog} from '../../../model/userLog.model';
import {errorLog} from '../../../model/errorLog.model';

Template.adminDashboard.onCreated(() => subscribe(['users', 'userStatus', 'userLogs', 'errorLogs']));

Template.usersDashboard.helpers({

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
  return user ? ('users/' + user._id + path) : path;
}

Template.logManager.helpers({

  /**
   * @method userLogsUrl
   */
  userLogsUrl: () => _logUrl('logs'),

  /**
   * @method errorLogsUrl
   */
  errorLogsUrl: () => _logUrl('errors')
});