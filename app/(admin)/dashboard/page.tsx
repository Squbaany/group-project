"use client"
import {Button} from "@/components/ui/button";
import {updateFeatured} from "@/lib/mongodb/actions/featured.actions";

export default function Home() {
  async function update() {
    await updateFeatured()
  }

  return (
    <div className="bg-primary-300 flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
      <p>Hello Admin!</p>

      <Button onClick={ () => update() }>Reset daily product!</Button>
    </div>
  );
}
