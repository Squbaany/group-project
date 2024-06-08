import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/mongodb/actions/order.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const items = JSON.parse(metadata?.items || "[]");

    const order = {
      stripeId: id,
      items: items.map(
        (item: { id: string; price: string; quantity: number }) => ({
          id: item.id,
          quantity: item.quantity,
        })
      ) || [{}],
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      address: JSON.parse(metadata?.address || "{}"),
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
