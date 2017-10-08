// FlowRouter.route('/dashboard', function () {
//     this.render('adminDashboard');
// });
//
// FlowRouter.route('/dashboard/users', function () {
//     this.render('userData');
// }, {name: 'dashboard.users'});
//
////
// FlowRouter.route('/dashboard/users/:userId', function () {
//     this.render('editUser');
// });
FlowRouter.route('/dashboard', {
  action: () => BlazeLayout.render('adminLayout', {content: 'adminDashboard'}),
  name: 'dashboard'
});

FlowRouter.route('/dashboard/errors', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogsData'}),
  name: 'errorLog'
});

FlowRouter.route('/dashboard/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLog'
});

FlowRouter.route('/dashboard/users/:userId/errors', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogsData'}),
  name: 'errorLog'
});

FlowRouter.route('/dashboard/users/:userId/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLog'
});

FlowRouter.route('/dashboard/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLog'
});

FlowRouter.route('/dashboard/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLog'
});

FlowRouter.route('/dashboard/users/:userId/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLog'
});

FlowRouter.route('/dashboard/users/:userId/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLog'
});