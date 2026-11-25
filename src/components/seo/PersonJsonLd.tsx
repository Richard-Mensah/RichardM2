import { personDetailJsonLd, personJsonLd } from "@/lib/person";

/** schema.org Person data for search engines. `detail` adds personal background (about pages only). */
export default function PersonJsonLd({ detail = false }: { detail?: boolean }) {
  const data = detail ? personDetailJsonLd() : personJsonLd();
  return (
    <script
      type="application/ld+json"
      // Static, server-built JSON; "<" is escaped so the payload cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
