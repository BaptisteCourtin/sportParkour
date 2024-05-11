import React from "react";

const DateFormatter = ({ datetime }: any) => {
  return (
    <time>
      {new Date(+datetime).toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
};

export default DateFormatter;
