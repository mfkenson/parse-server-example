Parse.Cloud.define('hello', function(req, res) {
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
