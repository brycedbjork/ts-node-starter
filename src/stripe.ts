import Stripe from "stripe";
const stripe = new Stripe(<string>process.env.STRIPE_SECRET_KEY);
export default stripe;
