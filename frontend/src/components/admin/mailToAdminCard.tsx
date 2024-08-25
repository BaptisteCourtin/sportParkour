import {
  MailToAdminEntity,
  useDeleteMailToAdminMutation,
} from "@/types/graphql";
import toast from "react-hot-toast";

const mailToAdminCard = ({
  mail,
  removeFromList,
}: {
  mail: MailToAdminEntity;
  removeFromList: any;
}) => {
  const [deleteMailToAdmin, { loading: loading, error: error }] =
    useDeleteMailToAdminMutation();

  function suppThisMail(mailId: string): void {
    deleteMailToAdmin({
      variables: { deleteMailToAdminId: +mailId },
      onCompleted(data) {
        toast.success(data.deleteMailToAdmin.message);
        removeFromList(mailId);
      },
      onError(err: any) {
        console.error("error", err);
        toast.error(error.message);
      },
    });
  }

  return (
    <li className="mailToAdminCard">
      <div className="user">
        <p>
          {mail.firstname} {mail.name}
        </p>
        <span>{mail.emailUser}</span>
      </div>
      <div className="message">
        <h4>{mail.sujet}</h4>
        <p>{mail.messageToAdmin}</p>
      </div>
      <button onClick={() => suppThisMail(mail.id)}>Supprimer</button>
    </li>
  );
};

export default mailToAdminCard;
