import CardParkour from "@/components/parkour/cardParkour";
import {
  GetParkourByIdQuery,
  useGetAllParkourQuery,
  useGetParkourByIdLazyQuery,
} from "@/types/graphql";

export default function Home() {
  // appel à 20 parkours (les + proches de base)
  // les 20 + nouveaux
  // favoris (???)

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
  // function handleSearchById(e: React.MouseEvent<HTMLButtonElement>): void {
  //   const numero = e.target.value;
  //   if (numero) {
  //   }
  // }

  return (
    <main className="pageIndex">
      <h1>Bonjour</h1>

      {/* <form onSubmit={handleSearchById(onSubmit)}>
        <label htmlFor="numero">numéro du parkour :</label>
        <input
          id="numero"
          {...register("numero")}
          placeholder="numéro du parkour"
        />
        <button
          type="submit"
          disabled={loadingCreate || loadingPatch} // évite de recliquer quand c'est entrain de faire la requête
        >
          Enregistrer
        </button>
      </form> */}

      <ul className="cardsParkoursUl">
        {data?.getAllParkour
          .slice() // car graphql nous renvoie un tableau en lecture seule
          .map((parkour: GetParkourByIdQuery["getParkourById"]) => (
            <CardParkour parkour={parkour} key={parkour.id} />
          ))}
      </ul>
    </main>
  );
}
