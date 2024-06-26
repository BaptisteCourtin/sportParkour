import NoteCard from "@/components/admin/noteCard";
import ReportCard from "@/components/admin/reportCard";
import { useGetUserByIdForPageReportLazyQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
        onCompleted(data) {
          console.log(data);
        },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- SUPPRIME USER ---

  return (
    <main className="userIdByReports">
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByIdForPageReport && (
          <div>
            <section>
              <ul className="infosMalfrat">
                <h1>
                  {data.getUserByIdForPageReport.name}{" "}
                  {data.getUserByIdForPageReport.firstname}{" "}
                </h1>
                <h2>{data.getUserByIdForPageReport.id}</h2>
                <p>{data.getUserByIdForPageReport.email}</p>
                <p>
                  L'utilisateur a {data.getUserByIdForPageReport.nbReportValide}{" "}
                  report valide contre lui
                </p>
                <p>
                  L'utilisateur a émis{" "}
                  {data.getUserByIdForPageReport.nbReportAjoute} reports
                </p>
              </ul>
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
                <h3>L'utilisateur à mis ces commentaires : </h3>
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
          </div>
        )
      )}
    </main>
  );
};

export default OneUserByReports;
