import React from "react";
import {
  UserInputRegisterEntity,
  useInscriptionMutation,
} from "@/types/graphql";
import { useRouter } from "next/router";

const inscription = () => {
  const router = useRouter();

  const [inscription, { data, loading, error }] = useInscriptionMutation();

  function handleInscription(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as UserInputRegisterEntity;

    if (data.email && data.password && data.name && data.firstname) {
      inscription({
        variables: { infos: data },
        onCompleted() {
          router.push(`/auth/login`);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  }

  return (
    <main className="auth">
      <h1>INSCRIPTION</h1>

      <form onSubmit={handleInscription}>
        <div>
          <label htmlFor="email">Votre email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Indiquez votre email"
          />
        </div>

        <div>
          <label htmlFor="password">Votre mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Indiquez votre mot de passe"
          />
        </div>

        <div>
          <label htmlFor="name">Votre nom</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Indiquez votre nom"
          />
        </div>

        <div>
          <label htmlFor="firstname">Votre prénom</label>
          <input
            id="firstname"
            name="firstname"
            type="firstname"
            placeholder="Indiquez votre prénom"
          />
        </div>

        <div>
          <label htmlFor="city">Votre ville</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Indiquez votre ville"
          />
        </div>

        <div>
          <label htmlFor="codePostal">Votre code postal</label>
          <input
            id="codePostal"
            name="codePostal"
            type="text"
            placeholder="Indiquez votre code postal"
          />
        </div>

        <div>
          <label htmlFor="phone">Votre numéro de téléphone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Indiquez votre numéro de téléphone"
          />
        </div>

        <input type="submit" className="butt" />

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default inscription;
