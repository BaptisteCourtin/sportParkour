import Link from "next/link";

import ButtonForRepport from "@/components/admin/buttonForReport";
import DateFormatter from "@/components/DateFormatter";

// card report d'un commentaire, version page modo d'un user
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
          Report émis le : <DateFormatter datetime={report.createdAt} />
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
        Parkour du commentaire : {report.parkour?.title}
      </Link>
    </li>
  );
};

export default reportCard;
