import CardParkour from "@/components/parkour/cardParkour";

export default function Home() {
  // appel à 20 parkours (les + proches de base)
  // 20 + nouveaux
  // favoris (???)

  return (
    <>
      <main>
        <h1>Bonjour</h1>
        <CardParkour />
      </main>
    </>
  );
}
