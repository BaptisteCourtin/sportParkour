import Link from "next/link";

import ButtonForRepport from "@/components/admin/buttonForReport";
import DateFormatter from "@/components/DateFormatter";

// card pour afficher un commentaire report, page modo
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
      <p>Nombre de reports valides : {report.malfrat?.nbReportValide}</p>

      <div className="commentInFaute">
        <span>
          Report émis le : <DateFormatter datetime={report.createdAt} />
        </span>

        <p>{report.commentaireEnFaute}</p>
      </div>

      <Link href={`/parkour/${report.parkour?.id}`}>
        Parkour du commentaire : {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCardForSearch;
