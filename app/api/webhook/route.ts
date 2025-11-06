import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPTE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    if (!data.user) {
      return NextResponse.json({
        success: false,
        msg: "Login Required",
      });
    }

    const customer = await stripe.customers.create({
      name: data.user.user.name,
      email: data.user.user.email,
      address: {
        line1: "center bus stop ",
        postal_code: "395002",
        city: "surat",
        state: "gujarat",
        country: "india",
      },
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: data.product.title,
              images: [data.product.image],
              description: data.product.description,
            },
            currency: "INR",
            unit_amount: data.product.price * 100,
          },
        },
      ],
      success_url:
        "http://localhost:3000/v1/payment/success?customer_id=" + customer.id,
      cancel_url: "http://localhost:3000/v1/products/" + data.product.id,
    });

    return NextResponse.json({
      success: true,
      session: checkoutSession,
      paymentURL: checkoutSession.url,
      msg: "Payment Intialized successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "Something went wrong",
      error: error,
    });
  }
}
