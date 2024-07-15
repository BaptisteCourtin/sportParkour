import React from "react";

const DateFormatter = ({ datetime }: { datetime: string }) => {
  const date = new Date(datetime);
  if (isNaN(date.getTime())) {
    return <time>Date invalide</time>;
  }

  return (
    <time>
      {date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
};

export default DateFormatter;
