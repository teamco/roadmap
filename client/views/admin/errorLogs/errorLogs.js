import {isUserLogs, is403, throwError, runTemplateHelper} from '../../../../lib/utils';
import {subscribe} from '../../template';
import {userLog} from '../../../../model/userLog.model';
import {errorLog} from '../../../../model/errorLog.model';
import {errorLogPages} from '../../../../model/errorLog.model';

Template.errorLogData.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));
Template.errorLogsData.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));
Template.errorLogsDataItem.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));

/**
 * @method _filterByUser
 * @param user
 * @returns {Array}
 * @private
 */
function _filterByUser(user) {
  return _.map(
      userLog.find({userId: user._id}).fetch(),
      function(log) {
        return log._id;
      }
  );
}

/**
 * @method _getErrorData
 * @param errorId
 * @returns {any | Promise | *}
 * @private
 */
function _getErrorData(errorId) {
  const user = isUserLogs();
  let failed = '/dashboard/errors';
  let error;

  errorId = errorId || FlowRouter.current().params.errorId;

  if (user && user._id) {
    error = errorLog.findOne({
      _id: errorId,
      userLogId: {
        $in: _filterByUser(user)
      }
    });

    if (!error) {
      failed = '/dashboard/users/' + user._id + '/errors';
    }
  } else {
    error = errorLog.findOne(errorId);
  }

  if (error) {
    return error;
  }

  return is403(errorId, failed);
}

Template.errorLogData.events({
  'click a[data-type="error"]': function(event) {

    event.preventDefault();

    // var errorId = Router.current().params.errorId,
    //     errorLog = ErrorLog.findOne(errorId);

    if (errorLog.fixed) {
      Bert.alert(TAPi18n.__('error_already_fixed'), 'warning');
      return false;
    }

    Meteor.call(
        'updateErrorLog', {
          errorId: errorId
        },
        function(error, result) {

          if (throwError(error)) {
            return false;
          }

          Bert.alert(TAPi18n.__('error_fixed'), 'info');
          //Router.go('/dashboard/errors');
        }
    );
  }
});

Template.errorLogsData.onCreated(function() {
  const user = isUserLogs();
  if (user && user._id) {

    errorLogPages.set({
      filters: {
        userLogId: {
          $in: _filterByUser(user)
        }
      }
    });
  }
});

Template.errorLogsData.helpers({
  errorLogsCount: function() {
    return runTemplateHelper(Template.errorLogs, 'errorLogsCount');
  }
});

Template.errorLogData.helpers({
  errorLog: _getErrorData
});

Template.errorLogsDataItem.helpers({});