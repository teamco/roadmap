import {userLog} from '../../model/userLog.model';

Meteor.methods({
  updateUserLog: function(url) {

    const connection = this.connection,
        headers = connection.httpHeaders;

    if ((url || '').match(/logs/)) {
      return false;
    }

    const log = {
      userId: this.userId,
      createdAt: new Date(),
      url: url,
      clientAddress: connection.clientAddress,
      httpHeaders: {
        'accept-language': headers['accept-language'],
        'user-agent': headers['user-agent'],
        'x-forwarded-for': headers['x-forwarded-for'],
        host: headers.host
      }
    };

    return userLog.findOne({_id: userLog.insert(log)});
  }
});