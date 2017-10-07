Template.usersDashboard.helpers({
    registeredUsers: function () {
        return Accounts.users.find().count();
    },
    onlineUsers: function () {
        return Accounts.users.find({'status.online': true}).count();
    }
});

function logUrl(type) {
    var user = isUserLogs();
    return user ?
        ('/setting/users/' + user._id + type) :
        ('/setting' + type);
}

Template.userLogs.helpers({
    userLogsCount: () => {
        const user = isUserLogs();
        return user ?
            userLog.find({userId: user._id}).count() :
            userLog.find().count();
    },

    userLogsUrl: function () {
        return logUrl('/logs');
    }
});

Template.errorLogs.helpers({
    errorLogsCount: function () {

        var user = isUserLogs();

        if (user) {

            if (user._id) {

                return ErrorLog.find({
                    userLogId: {
                        $in: _.map(
                            userLog.find({userId: user._id}).fetch(),
                            function (log) {
                                return log._id;
                            }
                        )
                    }
                }).count();
            }
        }

        return ErrorLog.find().count();
    },

    errorLogsUrl: function () {
        return logUrl('/errors');
    }
});

Meteor.subscribe("users");
Meteor.subscribe("userStatus");
Meteor.subscribe("userLogs");
Meteor.subscribe("errorLogs");