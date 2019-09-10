const generator = require('generate-password');
//const Parse = require('parse/node');

let cloudFunctions = {
    test: async (req, res) => {
        return "OK"
    },

    signUp: async (req, res) => {
        let params = req.params;
        let password = generator.generate({
            length: 10,
            numbers: true
        });
        let email = params.email;
        if (!email){
            throw "missing param: email";
        }
        let user = new Parse.User();
        user.set("username", email);
        user.set("password", password);
        user.set("initialPassword", password);
        user.set("email", email);

        try {
            await user.signUp();
            return user;
        } catch (error) {
            // Show the error message somewhere and let the user try again.
            throw error;
        }
    },

    signIn: async (req, res) => {
        let params = req.params;
        let email = params.email;
        if (!email){
            throw "missing param: email";
        }
        let password = params.password;
        if (!email){
            throw "missing param: password";
        }

        try {
            return await Parse.User.logIn(email, password);
        } catch (error) {
            // Show the error message somewhere and let the user try again.
            throw error;
        }
    },

    list: async (req, res) => {
        const user = req.user;
        if (!user || !user.get('isAdmin')){
            throw "admin only"
        }
        const query = new Parse.Query(Parse.User);
        try {
            return await query.find({useMasterKey: true});
        } catch (error) {
            throw error;
        }
    }
};

module.exports = {
    cloudFunctions: cloudFunctions
};
