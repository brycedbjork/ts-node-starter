import stripe from "../../stripe";

/*
Takes email, name, and phone
Returns customer id
*/

export default async (email: string, name: string, phone: string) => {
  const newCustomer = await stripe.customers.create({
    email,
    name,
    phone
  });

  return newCustomer.id;
};
