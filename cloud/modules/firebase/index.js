var admin = require('firebase-admin');
var serviceAccount = require(process.env['FIREBASE_SERVICE_ACCOUNT_KEY']);

module.exports = {
    init: function(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env['FIREBASE_DATABASE_URL']
        });
        console.log('firebase init')
    },

    cloudFunctions: {
        verifyAuth: function(req, res){
            const idToken = req.params.idToken;
            return admin.auth().verifyIdToken(idToken)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    console.log(decodedToken);
                    return decodedToken
                }).catch(function(error) {
                // Handle error
                    console.error(error)
                    return error
                });
        },


        login: function(req, res){
            const idToken = req.params.idToken;
            return admin.auth().verifyIdToken(idToken)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    console.log(decodedToken);
                    return Parse.User.logInWith('firebase',{
                        authData: {
                            access_token: idToken,
                            id: uid
                        }
                    }).then (function(user) {
                        // Return the current login session to client for client login
                        console.log('Successfully linked to firebase');
                        return (user.getSessionToken());
                    })
                }).catch(function(error) {
                    // Handle error
                    console.error(error)
                    return error
                });
        }
    }
};
