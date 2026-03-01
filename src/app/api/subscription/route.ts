import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ isPro: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        isPro: true,
        stripeCurrentPeriodEnd: true,
      },
    });

    // Check if subscription has expired
    if (user?.stripeCurrentPeriodEnd && user.stripeCurrentPeriodEnd < new Date()) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { isPro: false },
      });
      return NextResponse.json({ isPro: false });
    }

    return NextResponse.json({
      isPro: user?.isPro || false,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json({ isPro: false });
  }
}
