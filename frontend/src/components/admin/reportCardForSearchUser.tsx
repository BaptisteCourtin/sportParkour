import Link from "next/link";
import React from "react";

const reportCardForSearchUser = ({ reportUser }: any) => {
  return (
    <li className={`${reportUser.nbReportValide} reportCard`}>
      <Link href={`/admin/reports/user/${reportUser.id}`}>
        <p>{reportUser.name}</p>
        <p>{reportUser.firstname}</p>
        <p>
          L'utilisateur a {reportUser.nbReportValide} report valide contre lui
        </p>
        <p>L'utilisateur a émis {reportUser.nbReportAjoute} reports</p>
      </Link>
    </li>
  );
};

export default reportCardForSearchUser;
