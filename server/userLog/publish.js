import {runAsAdmin} from '../../lib/utils';
import {userLog} from '../../model/userLog.model';

Meteor.publish('userLogs', function() {
  return runAsAdmin(this.userId, userLog.find());
});