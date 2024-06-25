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
              <ul className="listReports">
                <h4>Les reports contre cet utilisateur : </h4>
                {data.getUserByIdForPageReport.reports?.map((report, index) => (
                  <ReportCard report={report} key={index} />
                ))}
              </ul>
            </section>

            <section>
              <ul className="listNotes">
                <h4>L'utilisateur à mis ces commentaires : </h4>
                {data.getUserByIdForPageReport.notesParkours?.map(
                  (note, index) => (
                    <NoteCard note={note} key={index} />
                  )
                )}
              </ul>
            </section>
          </div>
        )
      )}
    </main>
  );
};

export default OneUserByReports;
