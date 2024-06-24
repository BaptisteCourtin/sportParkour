import React from "react";

import Rating from "@mui/material/Rating";

const displayComments = ({ comment }: any) => {
  return (
    <div className="displayComment">
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

export default displayComments;
