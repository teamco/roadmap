import {isUserLogs, getUser, runTemplateHelper} from '../../../../lib/utils';
import {subscribe} from '../../template';
import {userLog} from '../../../../model/userLog.model';
import {userLogPages} from '../../../../model/userLog.model';

/**
 * @instance sharedMethods
 * @type {{logOwnerEmail: (function(*=)), logId: (function(): (sharedMethods.logId|(function()))), userLog: (function(): {httpHeaders: {}}), isError: sharedMethods.isError}}
 */
export const sharedMethods = {
  logOwnerEmail: userId => getUser(userId).profile.email,
  logId: () => FlowRouter.current().params.logId,
  userLog: () => userLog.find(sharedMethods.logId()).fetch()[0] || {httpHeaders: {}},
  isError: function(logId) {
    //return ErrorLog.findOne({userLogId: sharedMethods.logId() || logId});
  }
};

/**
 * @constant HEADS
 * @type {[string,string,string,string]}
 */
export const HEADS = ['User action', 'IP', 'Created at', 'Show'];

Template.userLogsData.onCreated(() => {
  subscribe(['users', 'userLogs', 'errorLogs']);
  const user = isUserLogs();
  if (user && user._id) {
    userLogPages.set({
      filters: {
        userId: user._id
      }
    });
  }
});

Template.userLink.helpers({
  logOwnerEmail: sharedMethods.logOwnerEmail
});

Template.userLogsData.helpers({
  getHeads: HEADS,
  isError: sharedMethods.isError,
  userLogsCount: () => runTemplateHelper(Template.userLogs, 'userLogsCount')
});

Template.userLogsDataItem.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));

Template.userLogsDataItem.helpers({
  style: function() {
    return sharedMethods.isError(this._id) ? 'danger' : 'info';
  },
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError
});