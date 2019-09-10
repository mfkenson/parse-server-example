Parse.Cloud.define('hello', function(req, res) {
  return 'Hi Kenson';
});


var orm = require('./modules/orm');
Parse.Cloud.define('orm@test', orm.cloudFunctions.test);
Parse.Cloud.define('orm@save', orm.cloudFunctions.save);
Parse.Cloud.define('orm@list', orm.cloudFunctions.list);
Parse.Cloud.define('orm@update', orm.cloudFunctions.update);
Parse.Cloud.define('orm@destroy', orm.cloudFunctions.destroy);
