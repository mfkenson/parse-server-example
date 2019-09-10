const OneSignal = require('onesignal-node');
const myClient = new OneSignal.Client({
    userAuthKey: process.env.ONE_SIGNAL_AUTH_KEY,
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: process.env.ONE_SIGNAL_APP_AUTH_KEY, appId: process.env.ONE_SIGNAL_APP_ID }
});
let cloudFunctions = {
    test: (req, res) => {
        return "OK"
    },

    listDevices: (req, res) => {
        return myClient.viewDevices('limit=100&offset=0').then(response=>{
            return JSON.parse(response.data)
        })
    },

    send: (req, res) => {
        let firstNotification = new OneSignal.Notification({
            contents: {
                en: "Test notification",
                //tr: "Test mesajı"
            }
        });

        // set target users
        //firstNotification.postBody["included_segments"] = ["Active Users"];
        //firstNotification.postBody["excluded_segments"] = ["Banned Users"];

        // set notification parameters
        //firstNotification.postBody["data"] = {"abc": "123", "foo": "bar"};
        //firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';

        return myClient.sendNotification(firstNotification)
            .then(function (response) {
                console.log(response.data, response.httpResponse.statusCode);
            })
            .catch(function (err) {
                console.log('Something went wrong...', err);
            });
    }
};

module.exports = {
    cloudFunctions: cloudFunctions
};
