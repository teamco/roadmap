import {runAsAdmin} from '../../lib/utils';

Meteor.publish('users', () => runAsAdmin(this, Meteor.users.find()));
Meteor.publish('userStatus', () => runAsAdmin(this, Meteor.users.find({'status.online': true})));
Meteor.publish('roles', () => runAsAdmin(this, Meteor.roles.find()));