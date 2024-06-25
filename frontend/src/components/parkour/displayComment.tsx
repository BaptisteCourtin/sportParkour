import React from "react";

import Rating from "@mui/material/Rating";
import { useReportNoteMutation } from "@/types/graphql";
import toast from "react-hot-toast";

const displayComment = ({
  comment,
  parkourId,
}: {
  comment: any;
  parkourId: string;
}) => {
  const [reportNote, { loading, error }] = useReportNoteMutation();

  function handleReportNote(): void {
    reportNote({
      variables: {
        commentaire: comment.commentaire,
        parkourId: +parkourId,
        malfratId: comment.user.id,
      },
      onCompleted() {
        toast.success("vous avez report ce message");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }

  return (
    <div className="displayComment">
      <button onClick={() => handleReportNote()}>reporter</button>
      <img src="/userDefault.png" className="imgProfil" />
      <div>
        <p>
          {comment.user.firstname} {comment.user.name}
        </p>
      </div>

      <Rating
        defaultValue={parseFloat(comment.note)}
        precision={0.1}
        readOnly
      />

      <p>{comment.commentaire}</p>
    </div>
  );
};

export default displayComment;
