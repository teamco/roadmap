import {runAsAdmin} from '../../lib/utils';
import {errorLog} from '../../model/errorLog.model';

Meteor.publish('errorLogs', () => runAsAdmin(this, errorLog.find()));