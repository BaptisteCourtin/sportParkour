import Link from "next/link";

const miniCardParkour = ({ parkourConnect }) => {
  return (
    <li>
      <Link href={`/parkour/${parkourConnect.id}`} className="cardEpreuve">
        {parkourConnect.images &&
        parkourConnect.images[0] &&
        parkourConnect.images[0].lien ? (
          <img src={parkourConnect.images[0].lien} alt="" />
        ) : (
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            alt=""
          />
        )}
        <p>{parkourConnect.title}</p>
      </Link>
    </li>
  );
};

export default miniCardParkour;
