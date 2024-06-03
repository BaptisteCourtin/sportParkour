import { useRouter } from "next/router";
import { GetParkourByIdQuery, useGetAllParkourQuery } from "@/types/graphql";

import CardParkour from "@/components/parkour/cardParkour";

// appel à 20 parkours (les + proches de base)
// les 20 + nouveaux
// favoris (???)
export default function Home() {
  const router = useRouter();

  const { data, loading, error } = useGetAllParkourQuery({
    fetchPolicy: "no-cache",
  });

  // const [
  //   getParkourById,
  //   { data: dataById, loading: loadingById, error: errorById },
  // ] = useGetParkourLazyQuery({
  //   fetchPolicy: "no-cache",
  // });

  // const [
  //   getParkourByName,
  //   { data: dataByName, loading: loadingByName, error: errorByName },
  // ] = useGetParkourLazyQuery({
  //   fetchPolicy: "no-cache",
  // });

  // --- GET BY ID ---
  const handleSearchById = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    router.push(`/parkour/${data.idParkour}`);
  };

  return (
    <main className="pageIndex">
      <h1>Bonjour</h1>

      <form onSubmit={handleSearchById}>
        <div>
          <label htmlFor="idParkour">numéro du parkour :</label>
          <input
            id="idParkour"
            name="idParkour"
            type="number"
            placeholder="numéro du parkour"
          />
        </div>
        <button type="submit">Chercher</button>
      </form>

      <ul className="cardsParkoursUl">
        {data?.getAllParkour.map(
          (parkour: GetParkourByIdQuery["getParkourById"]) => (
            <CardParkour parkour={parkour} key={parkour.id} />
          )
        )}
      </ul>
    </main>
  );
}
