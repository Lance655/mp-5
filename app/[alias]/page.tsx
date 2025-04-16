import { redirect } from "next/navigation";
import getCollection, { SHORT_URLS_COLLECTION } from "@/db";

export default async function AliasPage({ params } : { params: Promise<{alias: string}>}) {
    const { alias } = await params;
    const collection = await getCollection(SHORT_URLS_COLLECTION);
    const doc = await collection.findOne({ alias });

    if (!doc) {
        return redirect("/");
    }

    // If found, redirect to the stored URL
    return redirect(doc.url);
}
