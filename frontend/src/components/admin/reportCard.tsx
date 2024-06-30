import Link from "next/link";
import React from "react";
import ButtonForRepport from "./buttonForReport";

const reportCard = ({
  report,
  malfratId,
}: {
  report: any;
  malfratId: string;
}) => {
  return (
    <li className={`${report.status} reportCard`}>
      {report.status != "SUPPRIME" ? (
        <ButtonForRepport
          reportId={report.id}
          malfratId={malfratId}
          parkourId={report.parkour.id}
          commentaire={report.commentaireEnFaute}
        />
      ) : null}

      <p>{report.commentaireEnFaute}</p>
      <p>{report.createdAt}</p>
      <p>{report.status}</p>
      <br />
      <Link href={`/parkour/${report.parkour?.id}`}>
        {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCard;
