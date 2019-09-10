module.exports = {
    validator:{
        requireAuth: function(req, isAdmin=false){
            if (process.env.NODE_ENV != 'production')
                return;
            if (!req || !req.user){
                throw "Invalid user";
            }
            if (!req.user.get('isAdmin')){
                throw "Admin only"
            }
        },
        requireParams: function(req, paramKeys){
            if (paramKeys && paramKeys.length > 0) {
                paramKeys.forEach(key=>{
                    if (!req.params.hasOwnProperty(key))
                        throw "Missing param: " + key
                })
            }
        }
    },

    staticData: function(req, res){
        return {
            facebookSignInUrl: "https://www.facebook.com/v3.2/dialog/oauth?"+
                "client_id="+process.env.FACEBOOK_APPID+
                "&redirect_uri="+process.env.OAUTH_REDIRECT_URL+
                "&state="+internal.getStateParams()
        }
    }
};
