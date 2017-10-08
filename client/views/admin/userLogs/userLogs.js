import {isUserLogs, getUser, runTemplateHelper} from '../../../../lib/utils';
import {subscribe} from '../../template';
import {userLog} from '../../../../model/userLog.model';
import {userLogPages} from '../../../../model/userLog.model';

export const sharedMethods = {
  logOwnerEmail: userId => getUser(userId).profile.email,
  logId: () => FlowRouter.current().params.logId,
  userLog: () => userLog.find(sharedMethods.logId()).fetch()[0] || {httpHeaders: {}},
  isError: function(logId) {
    //return ErrorLog.findOne({userLogId: sharedMethods.logId() || logId});
  }
};

Template.userLogsData.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));
Template.userLogsDataItem.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));

Template.userLogsData.onCreated(() => {
  const user = isUserLogs();
  if (user && user._id) {
    userLogPages.set({
      filters: {
        userId: user._id
      }
    });
  }
});

Template.userLogsData.helpers({
  isError: sharedMethods.isError,
  userLogsCount: () => runTemplateHelper(Template.userLogs, 'userLogsCount')
});

Template.userLogsDataItem.helpers({
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError
});