import React from "react";

import Rating from "@mui/material/Rating";
import ButtonForComment from "../admin/buttonForComment";

// affiche un commentaire
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
      <div className="topComment">
        <div className="userProfil">
          {comment.user.imageProfil ? (
            <img src={comment.user.imageProfil} className="imgProfil" alt="" />
          ) : (
            <img src="/userDefault.png" className="imgProfil" alt="" />
          )}

          <p>
            {comment.user.firstname} {comment.user.name}
          </p>
        </div>
        {isAdmin || isClient ? (
          <ButtonForComment
            malfratId={comment.user.id}
            parkourId={+parkourId}
            commentaire={comment.commentaire}
            isAdmin={isAdmin}
            isClient={isClient}
          />
        ) : null}
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
