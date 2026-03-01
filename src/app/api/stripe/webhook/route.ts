import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

// Disable body parsing for webhook
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`Stripe webhook received: ${event.type}`);

    // Handle checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as unknown as {
        metadata?: { userId?: string };
        subscription?: string;
        customer?: string;
        amount_total?: number;
      };
      const userId = session.metadata?.userId;

      console.log(`Checkout completed for user: ${userId}, amount: ${session.amount_total}`);

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeSubscriptionId: session.subscription || null,
            stripeCustomerId: session.customer || null,
            isPro: true,
          },
        });
        console.log(`User ${userId} upgraded to Pro`);
      }
    }
    // Handle subscription updates
    else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as unknown as {
        id: string;
        customer: string;
        status: string;
        current_period_end: number;
        items?: { data: { price?: { id?: string } }[] };
      };

      console.log(`Subscription ${subscription.id} updated, status: ${subscription.status}`);

      await prisma.user.updateMany({
        where: { stripeCustomerId: subscription.customer },
        data: {
          isPro: subscription.status === "active",
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          stripePriceId: subscription.items?.data?.[0]?.price?.id || null,
        },
      });
    }
    // Handle subscription cancellation
    else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as unknown as {
        id: string;
        customer: string;
      };

      console.log(`Subscription ${subscription.id} cancelled`);

      await prisma.user.updateMany({
        where: { stripeCustomerId: subscription.customer },
        data: {
          stripeSubscriptionId: null,
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
          isPro: false,
        },
      });
      console.log(`User subscription cancelled, customer: ${subscription.customer}`);
    }
    // Handle payment failed
    else if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as unknown as {
        customer: string;
        subscription?: string;
      };

      console.log(`Payment failed for customer: ${invoice.customer}`);

      await prisma.user.updateMany({
        where: { stripeCustomerId: invoice.customer },
        data: { isPro: false },
      });
    }
    // Handle other events gracefully
    else {
      console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
