import { useEffect, useState } from "react";
import Link from "next/link";

import {
  useGetUserByTokenLazyQuery,
  useIsAdminQuery,
  useIsClientQuery,
} from "@/types/graphql";

import { FaPencil, FaArrowRight } from "react-icons/fa6";

import SuppUserDialog from "@/components/suppression/suppUserDialog";
import SeeProfil from "@/components/user/seeProfil";
import ModifyProfil from "@/components/user/modifyProfil";

const profil = () => {
  const [isModifMode, setIsModifMode] = useState(false);

  const {
    data: dataIsClient,
    loading: loadingIsClient,
    error: errorIsClient,
  } = useIsClientQuery();

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const [getUser, { data, loading, error }] = useGetUserByTokenLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getUser({
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, [isModifMode]);

  return (
    <main className="profil">
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByToken && (
          <>
            {isModifMode ? (
              // --- modif profil ---
              <ModifyProfil
                dataProfil={data.getUserByToken}
                setIsModifMode={setIsModifMode}
                isModifMode={isModifMode}
              />
            ) : (
              // --- profil ---
              <section className="seeProfil">
                <div className="topProfil">
                  <h1>
                    {data.getUserByToken.firstname} {data.getUserByToken.name}
                  </h1>

                  <button
                    className="openModif"
                    onClick={() => setIsModifMode(!isModifMode)}
                  >
                    <FaPencil />
                  </button>
                </div>

                <SeeProfil dataProfil={data.getUserByToken} />

                {/* --- déconnection et supp --- */}
                <div className="bottomButt">
                  <Link className="button danger" href="/user/logout">
                    Se déconnecter
                  </Link>

                  <SuppUserDialog
                    userEmail={data.getUserByToken.email}
                    userId={data.getUserByToken.id}
                  />
                </div>
              </section>
            )}

            {/* --- liens pour les pages de favoris / note / modo --- */}
            {dataIsClient ? (
              <div className="buttMyPages">
                <Link className="button" href="/user/notes">
                  MES AVIS <FaArrowRight />
                </Link>
                <Link className="fav button" href="/user/favoris">
                  MES FAVORIS <FaArrowRight />
                </Link>
              </div>
            ) : null}

            {dataIsAdmin ? (
              <Link className="goModo button" href="/admin/reports/recherche">
                MODÉRATION <FaArrowRight />
              </Link>
            ) : null}
          </>
        )
      )}
    </main>
  );
};

export default profil;
