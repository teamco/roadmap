Template.userData.events({
    'click a.delete-user': function (event, template) {

        event.preventDefault();

        var user = this,
            name = user.profile.name || user.profile.email;

        BootstrapModalPrompt.prompt({
            title: TAPi18n.__('user_delete'),
            content: TAPi18n.__('confirm_user_delete', name)
        }, function (confirmed) {

            if (confirmed) {

                // if (isCurrentUser(user._id)) {
                //     Meteor.logout();
                // }

                Meteor.call(
                    'destroyUser',
                    user,
                    function (error, result) {

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
    usersCount: function() {
        return Accounts.users.find().count();
    },
    allUsers: function () {
        return Accounts.users.find().fetch();
    },
    labelClass: function (_id) {
        var status = Accounts.users.findOne(_id).status;
        if (status.idle) return "label-warning";
        else if (status.online) return "label-success";
        else return "label-default";
    },
    // isCurrentUser: isCurrentUser
});

Meteor.subscribe("users");