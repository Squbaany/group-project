import { updateFeatured } from "@/lib/mongodb/actions/featured.actions";
import { NextResponse } from "next/server";

export async function GET() {
  const item = await updateFeatured();

  return new NextResponse(JSON.stringify(item), { status: 200 });
}
