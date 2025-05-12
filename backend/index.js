// backend/index.js
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(
  "sk_test_51RLiDtP1TbJNLwdaKVgacMzAkzsrkI8ZuMeSMkaekIjS9VBGVoBerYHwWhNdT1ZMLtEmW1woZvbj8CoSZZqyEx5X00jA03MRlq"
); // ✅ DO NOT use in frontend

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
