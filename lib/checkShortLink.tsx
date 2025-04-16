"use server";

import getCollection, { SHORT_URLS_COLLECTION } from "@/db";

export async function checkShortLink(alias: string, url: string) {
    // 0. Check alias characters
    const aliasRegex = /^[A-Za-z0-9_-]+$/;
    if (!aliasRegex.test(alias)) {
        return {
            success: false,
            message: "Alias can only contain letters, numbers, underscores, and hyphens.",
        };
    }

    // 1. Check if alias is in DB
    const collection = await getCollection(SHORT_URLS_COLLECTION);
    const existing = await collection.findOne({ alias });
    if (existing) {
        return {
            success: false,
            message: "Alias is taken",
        };
    }

    // 2. Validate URL
    try {
        new URL(url);
    } catch {
        return {
            success: false,
            message: "Invalid URL",
        };
    }

    // 3. Insert if all good
    await collection.insertOne({ alias, url });

    // 4. Return data to caller
    return {
        success: true,
        message: "all good",
    };
}
