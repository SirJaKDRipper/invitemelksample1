import { guests } from "@/data/guests";
import { notFound } from "next/navigation";
import ClientHome from "./ClientHome";

export function generateStaticParams() {
  return guests.map((g) => ({
    guest: g.slug,
  }));
}

export default function Home({ params }: { params: { guest: string } }) {
  const guest = guests.find((g) => g.slug === params.guest);

  if (!guest) {
    notFound();
  }

  return <ClientHome />;
}
