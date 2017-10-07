import {isUserLogs} from '../../../../lib/utils';
import {getUser} from '../../../../lib/utils';
import {runTemplateHelper} from '../../../../lib/utils';
import {userLogPages} from '../../../../model/userLog.model';
import {userLog} from '../../../../model/userLog.model';

export const sharedMethods = {
  logOwnerEmail: userId => getUser(userId).profile.email,
  logId: () => FlowRouter.current().params.logId,
  userLog: () => userLog.find(sharedMethods.logId()).fetch()[0] || {httpHeaders: {}},
  isError: function(logId) {
    //return ErrorLog.findOne({userLogId: sharedMethods.logId() || logId});
  }
};

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

Meteor.subscribe('users');
Meteor.subscribe('userLogs');

// Meteor.subscribe('errorLogs');