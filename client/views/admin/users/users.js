import {isCurrentUser, throwError} from '../../../../lib/utils';
import {subscribe} from '../../template';

Template.userData.onCreated(() => subscribe('users'));

Template.userData.events({
  'click a.delete-user': function(event, template) {
    event.preventDefault();
    const user = this,
        name = user.profile.name || user.profile.email;

    BootstrapModalPrompt.prompt({
      title: TAPi18n.__('user_delete'),
      content: TAPi18n.__('confirm_user_delete', name)
    }, confirmed => {
      if (confirmed) {

        // if (isCurrentUser(user._id)) {
        //     Meteor.logout();
        // }

        Meteor.call('destroyUser', user, function(error, result) {
              if (throwError(error)) {
                return false;
              }
              Bert.alert(TAPi18n.__('user_deleted', name), 'info');
            }
        );
      }
    });
  }
});

// This code only runs on the client
Template.userData.helpers({
  usersCount: () => Accounts.users.find().count(),
  allUsers: () => Accounts.users.find().fetch(),
  labelClass: _id => {
    const status = Accounts.users.findOne(_id).status;
    let style = 'label-default';
    if (status && status.idle) style = 'label-warning';
    if (status && status.online) style = 'label-success';
    return style;
  },
  isCurrentUser: isCurrentUser
});