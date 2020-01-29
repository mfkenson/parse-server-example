Parse.Cloud.define('hello', function(req, res) {
  if (req.user){
    return 'Hi ' + req.user.get('username');
  }
  return 'Hi Kenson';
});

const orm = require('./modules/orm');
Parse.Cloud.define('orm@test', orm.cloudFunctions.test);
Parse.Cloud.define('orm@save', orm.cloudFunctions.save);
Parse.Cloud.define('orm@list', orm.cloudFunctions.list);
Parse.Cloud.define('orm@update', orm.cloudFunctions.update);
Parse.Cloud.define('orm@destroy', orm.cloudFunctions.destroy);

const payment = require('./modules/payment');
Parse.Cloud.define('payment@test', payment.cloudFunctions.test);
Parse.Cloud.define('payment@list_customers', payment.cloudFunctions.listCustomers);

const push = require('./modules/push');
Parse.Cloud.define('push@list_devices', push.cloudFunctions.listDevices);

const email = require('./modules/email');
Parse.Cloud.define('email@send', email.cloudFunctions.send);

const user = require('./modules/user');
Parse.Cloud.define('user@test', user.cloudFunctions.test);
Parse.Cloud.define('user@sign_up', user.cloudFunctions.signUp);
Parse.Cloud.define('user@sign_in', user.cloudFunctions.signIn);
Parse.Cloud.define('user@list', user.cloudFunctions.list);

const role = require('./modules/role');
Parse.Cloud.define('role@init', role.cloudFunctions.init);
Parse.Cloud.define('role@list', role.cloudFunctions.list);
Parse.Cloud.define('role@listUsers', role.cloudFunctions.listRoleUsers);

const firebase = require('./modules/firebase');
Parse.Cloud.define('firebase@init', firebase.init);
Parse.Cloud.define('firebase@verifyAuth', firebase.cloudFunctions.verifyAuth);
Parse.Cloud.define('firebase@login', firebase.cloudFunctions.login);
