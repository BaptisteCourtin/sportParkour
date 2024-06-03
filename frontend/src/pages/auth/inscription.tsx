import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserInputRegisterEntity,
  useInscriptionMutation,
} from "@/types/graphql";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

let authSchema = object({
  email: string()
    .email("votre email doit être valide")
    .required("Veuillez entrer votre email"),
  password: string().required("Veuillez entrer votre mot de passe"),
  name: string().required("Veuillez entrer votre nom"),
  firstname: string().required("Veuillez entrer votre prénom"),

  city: string(),
  codePostal: string(),
  phone: string(),
});

// mettre le message de success en snackbar
const inscription = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const [inscription, { data, loading, error }] = useInscriptionMutation();

  const handleInscription = (dataForm: UserInputRegisterEntity): void => {
    if (
      dataForm.email &&
      dataForm.password &&
      dataForm.name &&
      dataForm.firstname
    ) {
      inscription({
        variables: { infos: dataForm },
        onCompleted(data) {
          if (data.inscription.success) {
            router.push("/");
          }
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  };

  return (
    <main className="auth">
      <Link href="/auth/login">Authentification</Link>

      <h1>INSCRIPTION</h1>

      <form onSubmit={handleSubmit(handleInscription)}>
        <div>
          <label htmlFor="email">Votre email</label>
          <input
            {...register("email")}
            id="email"
            name="email"
            type="text"
            placeholder="Indiquez votre email"
          />
          <p className="error">{errors?.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Votre mot de passe</label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            placeholder="Indiquez votre mot de passe"
          />
          <p className="error">{errors?.password?.message}</p>
        </div>

        <div>
          <label htmlFor="name">Votre nom</label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            placeholder="Indiquez votre nom"
          />
          <p className="error">{errors?.name?.message}</p>
        </div>

        <div>
          <label htmlFor="firstname">Votre prénom</label>
          <input
            {...register("firstname")}
            id="firstname"
            name="firstname"
            type="firstname"
            placeholder="Indiquez votre prénom"
          />
          <p className="error">{errors?.firstname?.message}</p>
        </div>

        <div>
          <label htmlFor="city">Votre ville</label>
          <input
            {...register("city")}
            id="city"
            name="city"
            type="text"
            placeholder="Indiquez votre ville"
          />
          <p className="error">{errors?.city?.message}</p>
        </div>

        <div>
          <label htmlFor="codePostal">Votre code postal</label>
          <input
            {...register("codePostal")}
            id="codePostal"
            name="codePostal"
            type="text"
            placeholder="Indiquez votre code postal"
          />
          <p className="error">{errors?.codePostal?.message}</p>
        </div>

        <div>
          <label htmlFor="phone">Votre numéro de téléphone</label>
          <input
            {...register("phone")}
            id="phone"
            name="phone"
            type="text"
            placeholder="Indiquez votre numéro de téléphone"
          />
          <p className="error">{errors?.phone?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          S'inscrire
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default inscription;
