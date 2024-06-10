import { updateFeatured } from "@/lib/mongodb/actions/featured.actions";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await updateFeatured();

    return NextResponse.json({ message: "Featured product updated" });
  } catch (err) {
    console.log(err);
  }
}
