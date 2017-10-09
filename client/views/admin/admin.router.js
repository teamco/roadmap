function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId()) {
    redirect('/')
  }
}

const privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    checkLoggedIn
  ]
});

privateRoutes.route('/dashboard', {
  action: () => BlazeLayout.render('adminLayout', {content: 'adminDashboard'}),
  name: 'dashboard'
});

privateRoutes.route('/dashboard/errors', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogsData'}),
  name: 'errorLogs'
});

privateRoutes.route('/dashboard/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLogs'
});

privateRoutes.route('/dashboard/users/:userId/errors', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogsData'}),
  name: 'errorLogs'
});

privateRoutes.route('/dashboard/users/:userId/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLogs'
});

privateRoutes.route('/dashboard/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLogs'
});

privateRoutes.route('/dashboard/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLogs'
});

privateRoutes.route('/dashboard/users/:userId/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLogs'
});

privateRoutes.route('/dashboard/users/:userId/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLogs'
});

privateRoutes.route('/dashboard/users', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userData'}),
  name: 'users'
});

privateRoutes.route('/dashboard/users/:userId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'editUser'}),
  name: 'users'
});
