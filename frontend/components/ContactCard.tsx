import type { Contact } from "@/data/contact";

export function ContactCard({ contact }: { contact: Contact }) {
    return (
        <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Email: {contact.email}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Address: {contact.address}
            </p>
        </article>
    );
}
