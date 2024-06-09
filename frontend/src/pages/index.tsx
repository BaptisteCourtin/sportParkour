import { useRouter } from "next/router";
import {
  GetParkourByIdQuery,
  useGetAllParkourQuery,
  useIsAdminQuery,
} from "@/types/graphql";

import CardParkour from "@/components/parkour/cardParkour";
import TextField from "@mui/material/TextField";
import Link from "next/link";

// appel à 20 parkours (les + proches de base)
// les 20 + nouveaux
// favoris (???)
export default function Home() {
  const router = useRouter();

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

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
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getAllParkour && (
          <>
            <h1>Bonjour</h1>

            {dataIsAdmin ? (
              <Link href="/admin/createParkour">créer un parkour</Link>
            ) : null}

            <form className="chercheIdParkour" onSubmit={handleSearchById}>
              <div>
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="numéro du parkour"
                  required
                  id="idParkour"
                  name="idParkour"
                  type="number"
                />
              </div>
              <button type="submit">Chercher par numéro</button>
            </form>

            <ul className="cardsParkoursUl">
              {data?.getAllParkour.map(
                (parkour: GetParkourByIdQuery["getParkourById"]) => (
                  <CardParkour parkour={parkour} key={parkour.id} />
                )
              )}
            </ul>
          </>
        )
      )}
    </main>
  );
}
