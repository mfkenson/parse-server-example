let customFunctions = {
    listRoles: async () =>{
        const query = new Parse.Query(Parse.Role);
        try {
            return await query.find({useMasterKey: true});
        } catch (error) {
            throw error;
        }
    },

    listUsersByRole: async (roleName) =>{
        let role = await customFunctions.findOneRole(roleName);
        if (role){
            return await role.getUsers().query().find({useMasterKey: true});
        } else {
            return null;
        }

    },

    findOneRole: async (roleName) => {
        const query = new Parse.Query(Parse.Role);
        query.equalTo("name", roleName);
        try {
            return await query.first({useMasterKey: true});
        } catch (error) {
            throw error;
        }
    }
};

let cloudFunctions = {
    init: async (req, res) => {
        return "OK"
    },

    list: async (req, res) => {
        return customFunctions.listRoles();
    },

    listRoleUsers: async (req, res) => {
        /*
        const user = req.user;
        if (!user || !user.get('isAdmin')){
            throw "admin only"
        }
        */
        try{
            let ret = {
                "Administrators": await customFunctions.listUsersByRole("Administrators"),
                "Moderators": await customFunctions.listUsersByRole("Moderators"),
                "Users": await customFunctions.listUsersByRole("Users")
            };
            return ret;
        } catch (error) {
            throw error;
        }
    }

};

module.exports = {
    customFunctions: customFunctions,
    cloudFunctions: cloudFunctions
};
