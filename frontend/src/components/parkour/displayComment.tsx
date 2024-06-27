import React from "react";

import Rating from "@mui/material/Rating";
import ButtonForComment from "../admin/buttonForComment";

const displayComment = ({
  comment,
  parkourId,
  isAdmin,
  isClient,
}: {
  comment: any;
  parkourId: string;
  isAdmin: boolean;
  isClient: boolean;
}) => {
  return (
    <div className="displayComment">
      {isAdmin || isClient ? (
        <ButtonForComment
          malfratId={comment.user.id}
          parkourId={+parkourId}
          commentaire={comment.commentaire}
          isAdmin={isAdmin}
          isClient={isClient}
        />
      ) : null}

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
