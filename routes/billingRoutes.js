const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {// the second argument is a middleware just for THIS PARTICULAR ROUTES
        const charge = await stripe.charges.create({
            amount: 500, //in reality best not to hardcode it but to send the amount with the checkout stripe object
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id //represents what charge source we are trying to build
        });
        
        //we now need to access our user to credit 5 credits to their account. Thanks to passport, we do not need to require mongoose. we can directly access our current user since it has become a property of the request body
        req.user.credits += 5
        const user = await req.user.save();

        res.send(user);
    });
}
