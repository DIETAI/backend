import Cors from 'micro-cors';
import { buffer } from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        // req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event);
    console.log('Udało się, ciśniemy dalej');
  }
};
export default cors(webhookHandler);
