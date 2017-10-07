import {throwError} from '../../lib/utils';

FlowRouter.route('/', {
  action: function() {
    FlowRouter.go('/pageOne');
  }
});

FlowRouter.route('/pageOne', {
  action: function() {
    BlazeLayout.render('adminLayout', {content: 'pageOne'});
  }
});

FlowRouter.route('/pageTwo', {
  action: function() {
    BlazeLayout.render('adminLayout', {content: 'pageTwo'});
  }
});

FlowRouter.route('/dashboard', {
  action: function() {
    BlazeLayout.render('adminLayout', {content: 'pageTwo'});
  },
  name: 'dashboard'
});


/**
 * @method updateUserLog
 */
const updateUserLog = function() {
  Meteor.call('updateUserLog', FlowRouter.current().path, function(error, result) {
    if (throwError(error)) {
      return false;
    }
  });
};

// FlowRouter.triggers.enter(requireLogin);
//FlowRouter.triggers.enter(updateUserLog);
FlowRouter.triggers.exit(updateUserLog);