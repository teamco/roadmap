// FlowRouter.route('/dashboard', function () {
//     this.render('adminDashboard');
// });
//
// FlowRouter.route('/dashboard/users', function () {
//     this.render('userData');
// }, {name: 'dashboard.users'});
//
//
// FlowRouter.route('/dashboard/errors', function () {
//     this.render('errorLogsData');
// }, {name: 'error.logs'});
//
// FlowRouter.route('/dashboard/errors/:errorId', function () {
//     this.render('errorLogData');
// });
//
// FlowRouter.route('/dashboard/users/:userId/errors', function () {
//     this.render('errorLogsData');
// });
//
// FlowRouter.route('/dashboard/users/:userId/errors/:errorId', function () {
//     this.render('errorLogData');
// });
//
// FlowRouter.route('/dashboard/users/:userId', function () {
//     this.render('editUser');
// });

FlowRouter.route('/dashboard', {
  action: () => BlazeLayout.render('adminLayout', {content: 'adminDashboard'}),
  name: 'dashboard'
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