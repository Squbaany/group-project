import { updateFeatured } from "@/lib/mongodb/actions/featured.actions";
import { NextResponse } from "next/server";

export async function changeFeatured() {
  try {
    await updateFeatured();

    return NextResponse.json({ message: "Featured product updated" });
  } catch (err) {
    console.log(err);
  }
}
