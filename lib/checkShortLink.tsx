"use server";

import getCollection, { SHORT_URLS_COLLECTION } from "@/db";

export async function checkShortLink(alias: string, url: string) {

    // 0. Is the alias valid?
    const aliasRegex = /^[A-Za-z0-9_-]+$/;
    if (!aliasRegex.test(alias)) {
        throw new Error("Alias can only contain letters, numbers, underscores, and hyphens.");
    }

    // 1. Check if alias is in DB
    const collection = await getCollection(SHORT_URLS_COLLECTION);
    const existing = await collection.findOne({ alias });
    if (existing) {
        throw new Error("Alias is taken");
    }

    // 2. Validate URL
    try {
        new URL(url);
    } catch {
        throw new Error("Invalid URL");
    }

    // 3. Insert if all good
    await collection.insertOne({ alias, url });

    // 4. Return data to caller
    return alias;
}
