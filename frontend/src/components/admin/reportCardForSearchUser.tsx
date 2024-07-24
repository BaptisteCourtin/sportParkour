import React from "react";
import Link from "next/link";

// card pour aficher un user rechercher, page modo
const reportCardForSearchUser = ({ reportUser }: any) => {
  return (
    <li
      className={`nbRep-${reportUser.nbReportValide} reportCardForSearchUser`}
    >
      <div className="userProfil">
        {reportUser.imageProfill ? (
          <img src={reportUser.imageProfill} className="imgProfil" />
        ) : (
          <img src="/userDefault.png" className="imgProfil" />
        )}

        <Link href={`/admin/reports/user/${reportUser.id}`}>
          {reportUser.firstname} {reportUser.name}
        </Link>
      </div>
      <p>
        L'utilisateur a {reportUser.nbReportValide} report valide contre lui
      </p>
      <p>L'utilisateur a émis {reportUser.nbReportAjoute} reports</p>
    </li>
  );
};

export default reportCardForSearchUser;
