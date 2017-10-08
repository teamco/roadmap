import {sharedMethods} from './userLogs';

Template.userLogData.helpers({
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError,
  userLog: () => sharedMethods.userLog(),
  acceptLanguage: () => sharedMethods.userLog().httpHeaders['accept-language'],
  userAgent: () => sharedMethods.userLog().httpHeaders['user-agent'],
  xForwardedFor: () => sharedMethods.userLog().httpHeaders['x-forwarded-for']
});

Template.userLogData.onCreated(() => {
  Meteor.subscribe('userLogs');
});