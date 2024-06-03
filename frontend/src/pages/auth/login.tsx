import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserInputAuthEntity,
  useAuthentificationLazyQuery,
} from "@/types/graphql";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

let loginSchema = object({
  email: string()
    .email("votre email doit être valide")
    .required("Veuillez entrer votre email"),
  password: string().required("Veuillez entrer votre mot de passe"),
});

// mettre le message de success en snackbar
const login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [authentification, { data, loading, error }] =
    useAuthentificationLazyQuery({ fetchPolicy: "no-cache" });

  const handleAuthentification = (dataForm: UserInputAuthEntity): void => {
    if (dataForm.email && dataForm.password) {
      authentification({
        variables: { infos: dataForm },
        onCompleted(data) {
          if (data.authentification.success) {
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
      <Link href="/auth/inscription">Inscription</Link>

      <form onSubmit={handleSubmit(handleAuthentification)}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            name="email"
            placeholder="Indiquez votre email"
          />
          <p className="error">{errors?.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
          />
          <p className="error">{errors?.password?.message}</p>
        </div>
        <button type="submit" disabled={loading}>
          Se connecter
        </button>

        <div>
          <span>{data?.authentification.message}</span>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default login;
