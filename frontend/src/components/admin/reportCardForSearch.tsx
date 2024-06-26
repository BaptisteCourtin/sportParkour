import React from "react";
import Link from "next/link";
import ButtonForRepport from "./buttonForReport";

const reportCardForSearch = ({ report }: any) => {
  return (
    <li className={`${report.status} reportCard`}>
      {report.status != "SUPPRIME" ? (
        <ButtonForRepport
          reportId={report.id}
          malfratId={report.malfrat.id}
          parkourId={report.parkour.id}
          commentaire={report.commentaireEnFaute}
        />
      ) : null}

      <p>{report.commentaireEnFaute}</p>
      <p>{report.createdAt}</p>
      <p>{report.status}</p>
      <br />
      <Link href={`/admin/reports/user/${report.malfrat?.id}`}>
        <p>{report.malfrat?.name}</p>
        <p>{report.malfrat?.firstname}</p>
        <p>{report.malfrat?.nbReportValide}</p>
      </Link>
      <br />
      <Link href={`/admin/reports/user/${report.reporter?.id}`}>
        <p>{report.reporter?.name}</p>
        <p>{report.reporter?.firstname}</p>
        <p>{report.reporter?.nbReportAjoute}</p>
      </Link>
      <br />
      <Link href={`/parkour/${report.parkour?.id}`}>
        {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCardForSearch;
