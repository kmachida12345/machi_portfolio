import type { Work } from "@/data/works";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchWorks(): Promise<Work[]> {
    const res = await fetch(`${API_BASE_URL}/api/works`);
    if (!res.ok) {
        throw new Error(`Failed to fetch works: ${res.status}`);
    }
    return res.json();
}
