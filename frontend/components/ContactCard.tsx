import type { Contact } from "@/data/contact";
import { Card } from "./util/Card";

export function ContactCard({ contact }: { contact: Contact }) {
    return (
        <Card>
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                <a href={`mailto:${contact.email}`}>Email: {contact.email}</a>
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Address: {contact.address}
            </p>
        </Card>
    );
}
