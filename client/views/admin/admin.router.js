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
  name: 'errorLog'
});

privateRoutes.route('/dashboard/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLog'
});

privateRoutes.route('/dashboard/users/:userId/errors', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogsData'}),
  name: 'errorLog'
});

privateRoutes.route('/dashboard/users/:userId/errors/:errorId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'errorLogData'}),
  name: 'errorLog'
});

privateRoutes.route('/dashboard/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLog'
});

privateRoutes.route('/dashboard/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLog'
});

privateRoutes.route('/dashboard/users/:userId/logs', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogsData'}),
  name: 'userLog'
});

privateRoutes.route('/dashboard/users/:userId/logs/:logId', {
  action: () => BlazeLayout.render('adminLayout', {content: 'userLogData'}),
  name: 'userLog'
});