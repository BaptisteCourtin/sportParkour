import React from "react";
import Link from "next/link";
import ButtonForRepport from "./buttonForReport";
import DateFormatter from "../DateFormatter";

const reportCardForSearch = ({ report }: any) => {
  return (
    <li className={`${report.status} reportCard`}>
      <div className="topComment">
        <div className="userProfil">
          {report.malfrat?.imageProfil ? (
            <img src={report.malfrat?.imageProfil} className="imgProfil" />
          ) : (
            <img src="/userDefault.png" className="imgProfil" />
          )}

          <Link href={`/admin/reports/user/${report.malfrat?.id}`}>
            {report.malfrat?.firstname} {report.malfrat?.name}
          </Link>
        </div>

        {report.status != "SUPPRIME" ? (
          <ButtonForRepport
            reportId={report.id}
            malfratId={report.malfrat.id}
            parkourId={report.parkour.id}
            commentaire={report.commentaireEnFaute}
          />
        ) : null}
      </div>
      <p>nombre de report valide : {report.malfrat?.nbReportValide}</p>

      <div className="commentInFaute">
        <span>
          report émis le : <DateFormatter datetime={report.createdAt} />
        </span>

        <p>{report.commentaireEnFaute}</p>
      </div>

      <Link href={`/parkour/${report.parkour?.id}`}>
        parkour du commentaire : {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCardForSearch;
