import {runAsAdmin} from '../../lib/utils';
import {userLog} from '../../model/userLog.model';

Meteor.publish('userLogs', () => runAsAdmin(this, userLog.find()));