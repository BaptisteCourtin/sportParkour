import CardParkour from "@/components/parkour/cardParkour";

export default function Home() {
  // appel à 20 parkours (les + proches de base)
  // les 20 + nouveaux
  // favoris (???)

  return (
    <main className="pageIndex">
      <h1>Bonjour</h1>
      <CardParkour />
    </main>
  );
}
