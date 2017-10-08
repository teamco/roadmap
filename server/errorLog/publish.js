import {runAsAdmin} from '../../lib/utils';
import {errorLog} from '../../model/errorLog.model';

Meteor.publish('errorLogs', function() {
  return runAsAdmin(this.userId, errorLog.find());
});