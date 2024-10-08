import { useEffect, useState } from "react";
import router from "next/router";

import {
  useGetReportsBySearchLazyQuery,
  useGetUsersWithReportsLazyQuery,
} from "@/types/graphql";

import TextField from "@mui/material/TextField";

import ReportCardForSearch from "@/components/admin/reportCardForSearch";
import ReportCardForSearchUser from "@/components/admin/reportCardForSearchUser";
import GoBack from "@/components/goBack";

const recherche = () => {
  const [isUserCard, setIsUserCard] = useState(false);

  // --- REQUEST SEARCH BY COMMENTS ---
  const [reports, setReports] = useState([]);

  const [getReportsBySearch, { data, loading, error }] =
    useGetReportsBySearchLazyQuery({ fetchPolicy: "no-cache" });

  const makeTheRequestForNote = (status: string) => {
    getReportsBySearch({
      variables: {
        status: status,
      },
      onCompleted(data) {
        setIsUserCard(false);
        setReports(data.getReportsBySearch);
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  };

  useEffect(() => {
    makeTheRequestForNote("nonVu");
  }, []);

  const removeReportFromList = (idToRemove: number) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id != idToRemove)
    );
  };

  // --- REQUEST SEARCH BY USER ---
  const [
    getUsersWithReports,
    {
      data: dataUsersWithReports,
      loading: loadingUsersWithReports,
      error: errorUsersWithReports,
    },
  ] = useGetUsersWithReportsLazyQuery({ fetchPolicy: "no-cache" });

  const makeTheRequestForUser = () => {
    getUsersWithReports({
      onCompleted() {
        setIsUserCard(true);
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  };

  // --- RECHERCHE USER BY ID ---
  const handleSearchById = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    router.push(`/admin/reports/user/${data.idUser}`);
  };

  return (
    <main className="reportSearch">
      <GoBack />

      <h1>RECHERCHER LES REPORTS</h1>

      <form onSubmit={handleSearchById} className="littleForm">
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="id d'utilisateur"
            required
            id="idUser"
            name="idUser"
            type="text"
          />
        </div>
        <button type="submit">Chercher par id</button>
      </form>

      <section className="buttonToSee">
        <button onClick={() => makeTheRequestForNote("nonVu")}>non vu</button>
        <button onClick={() => makeTheRequestForNote("supprime")}>
          supprimé (utilisateur encore actif)
        </button>
        <button onClick={() => makeTheRequestForUser()}>
          utilisateur avec reports
        </button>
      </section>

      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        reports &&
        !isUserCard && (
          <section>
            <ul className="listReports">
              {reports.map((report, index) => (
                <ReportCardForSearch
                  report={report}
                  key={index}
                  removeReportFromList={removeReportFromList}
                />
              ))}
            </ul>
          </section>
        )
      )}

      {errorUsersWithReports ? (
        <h2>une erreur... (déso) : {errorUsersWithReports.message}</h2>
      ) : loadingUsersWithReports ? (
        <h2>Chargement en cours</h2>
      ) : (
        dataUsersWithReports?.getUsersWithReports &&
        isUserCard && (
          <section>
            <ul className="listReports">
              {dataUsersWithReports.getUsersWithReports.map(
                (reportUser, index) => (
                  <ReportCardForSearchUser
                    reportUser={reportUser}
                    key={index}
                  />
                )
              )}
            </ul>
          </section>
        )
      )}
    </main>
  );
};

export default recherche;
