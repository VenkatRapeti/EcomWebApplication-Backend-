//const stripe = require("stripe")("process.env.STRIPE_KEY");

//const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")("sk_test_51K2FUBSBgw5cSPiqmfMqFRPsBkLzwEMKgQQZ8y7RiI3EmumufHozdYVEK8fH9p5WIk1GX2x0NZS10EkwHbAsw4nT00UEoKMooI");

exports.stripePayment = (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "inr"
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    )
}