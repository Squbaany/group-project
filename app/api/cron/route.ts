import { updateFeatured } from "@/lib/mongodb/actions/featured.actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const product = await updateFeatured();

    return NextResponse.json({
      message: "Featured product updated",
      product: product._id,
    });
  } catch (err) {
    console.log(err);
  }

  return new Response("Run cron", { status: 200 });
}
