import React, { useEffect, useState } from "react";

import {
  MailToAdminEntity,
  useGetAllMailToAdminLazyQuery,
} from "@/types/graphql";

import GoBack from "@/components/goBack";
import MailToAdminCard from "@/components/admin/mailToAdminCard";

const mailReceived = () => {
  const [mails, setMails] = useState<MailToAdminEntity[]>([]);

  const [getAllMailToAdmin, { data, loading, error }] =
    useGetAllMailToAdminLazyQuery();

  const makeTheRequestForMail = () => {
    getAllMailToAdmin({
      onCompleted(data) {
        setMails(data.getAllMailToAdmin);
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  };

  useEffect(() => {
    makeTheRequestForMail();
  }, []);

  const removeFromList = (idToRemove: string) => {
    setMails((prevMails) => prevMails.filter((mail) => mail.id != idToRemove));
  };

  return (
    <main className="mailReceived">
      <GoBack />

      <h1>LES MAILS</h1>

      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        mails && (
          <section>
            <ul className="listMails">
              {mails.map((mail, index) => (
                <MailToAdminCard
                  mail={mail}
                  key={index}
                  removeFromList={removeFromList}
                />
              ))}
            </ul>
          </section>
        )
      )}
    </main>
  );
};

export default mailReceived;
