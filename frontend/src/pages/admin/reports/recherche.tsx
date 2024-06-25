import React, { useEffect } from "react";
import { useGetReportsBySearchLazyQuery } from "@/types/graphql";
import ReportCardForSearch from "@/components/admin/reportCardForSearch";

const recherche = () => {
  const [getReportsBySearch, { data, loading, error }] =
    useGetReportsBySearchLazyQuery();

  // --- REQUEST SEARCH BY ALL ---
  const makeTheRequest = (status: string) => {
    getReportsBySearch({
      variables: {
        status: status,
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  };

  useEffect(() => {
    makeTheRequest("nonVu");
  }, []);

  return (
    <main>
      <h1>recherche les reports</h1>
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getReportsBySearch && (
          <div>
            <section>
              <button onClick={() => makeTheRequest("nonVu")}>non vu</button>
              <button onClick={() => makeTheRequest("vuEtLaisse")}>
                vu et laissé
              </button>
              <button onClick={() => makeTheRequest("vuEtLaisseModif")}>
                vu et laissé car modifié
              </button>
              <button onClick={() => makeTheRequest("vuEtSupprime")}>
                supprimé
              </button>
            </section>
            <section>
              <ul className="listReports">
                {data.getReportsBySearch.map((report, index) => (
                  <ReportCardForSearch report={report} key={index} />
                ))}
              </ul>
            </section>
          </div>
        )
      )}
    </main>
  );
};

export default recherche;
