import Link from "next/link";
import React from "react";
import ButtonForRepport from "../buttonForReport";
import DateFormatter from "@/components/DateFormatter";

const reportCard = ({
  report,
  malfratId,
}: {
  report: any;
  malfratId: string;
}) => {
  return (
    <li className={`${report.status} reportCard`}>
      <div className="top">
        <span>
          report émis le : <DateFormatter datetime={report.createdAt} />
        </span>

        {report.status != "SUPPRIME" ? (
          <ButtonForRepport
            reportId={report.id}
            malfratId={malfratId}
            parkourId={report.parkour.id}
            commentaire={report.commentaireEnFaute}
          />
        ) : null}
      </div>

      <p className="commentInFaute">{report.commentaireEnFaute}</p>

      <Link href={`/parkour/${report.parkour?.id}`}>
        parkour du commentaire : {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCard;