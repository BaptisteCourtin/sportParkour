import { useEffect } from "react";
import { useRouter } from "next/router";

import { useGetUserByIdForPageReportLazyQuery } from "@/types/graphql";

import NoteCard from "@/components/admin/reportUser/noteCard";
import ReportCard from "@/components/admin/reportUser/reportCard";
import SuppMalfratDialog from "@/components/suppression/suppMalfratDialog";
import GoToHome from "@/components/goBack";

const OneUserByReports = () => {
  const router = useRouter();
  const { userId } = router.query;

  // --- GET INFOS USER ---
  const [getUserReports, { data, loading, error }] =
    useGetUserByIdForPageReportLazyQuery();

  useEffect(() => {
    if (router.isReady && userId) {
      getUserReports({
        variables: { userId: userId as string },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [userId]);

  return (
    <div>
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByIdForPageReport && (
          <main className="userIdByReports">
            <GoToHome />

            <section className="infosMalfrat">
              <div>
                <h1>
                  {data.getUserByIdForPageReport.name}{" "}
                  {data.getUserByIdForPageReport.firstname}{" "}
                </h1>
                <h2>{data.getUserByIdForPageReport.id}</h2>
              </div>

              <div className="imgEmail">
                {data.getUserByIdForPageReport.imageProfil ? (
                  <img
                    src={data.getUserByIdForPageReport.imageProfil}
                    className="imgProfil"
                  />
                ) : (
                  <img src="/userDefault.png" className="imgProfil" />
                )}

                <p>{data.getUserByIdForPageReport.email}</p>
              </div>

              <div>
                <p>
                  L'utilisateur a {data.getUserByIdForPageReport.nbReportValide}{" "}
                  reports valides contre lui.
                </p>
                <p>
                  L'utilisateur a émis{" "}
                  {data.getUserByIdForPageReport.nbReportAjoute} reports
                </p>
              </div>

              {/* --- supp --- */}
              <SuppMalfratDialog dataMalfrat={data.getUserByIdForPageReport} />

              {/* --- */}
            </section>

            <section>
              <ul className="listReports">
                <h3>Les reports contre cet utilisateur : </h3>
                {data.getUserByIdForPageReport.reports?.map((report, index) => (
                  <ReportCard
                    report={report}
                    malfratId={data.getUserByIdForPageReport.id}
                    key={index}
                  />
                ))}
              </ul>
            </section>

            <section>
              <ul className="listNotes">
                <h3>L'utilisateur a mis ces commentaires : </h3>
                {data.getUserByIdForPageReport.notesParkours?.map(
                  (note, index) => (
                    <NoteCard
                      note={note}
                      malfratId={data.getUserByIdForPageReport.id}
                      key={index}
                    />
                  )
                )}
              </ul>
            </section>

            {/* --- */}
          </main>
        )
      )}
    </div>
  );
};

export default OneUserByReports;
