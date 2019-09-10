const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let cloudFunctions = {
    test: (req, res) => {
        return "OK"
    },

    listCustomers: (req, res) => {
        return stripe.customers.list(
                {limit: 100})
            .then(customers=>{
                return customers.data.map(c=>{
                    return c
                })
            });
    }
};

module.exports = {
    cloudFunctions: cloudFunctions
};
