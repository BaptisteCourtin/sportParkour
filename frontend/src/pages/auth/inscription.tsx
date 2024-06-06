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

import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { FaArrowRight } from "react-icons/fa6";

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
            toast.success(data.inscription.message);
            router.push("/");
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <main className="auth">
      <div className="imageTop">
        <h1>POSSEDEZ UN COMPTE PARKOUR</h1>
      </div>

      <form onSubmit={handleSubmit(handleInscription)}>
        <div className="topForm">
          <h2>INSCRIPTION</h2>
          <Link className="inscr" href="/auth/login">
            Vous avez déjà un compte ?
          </Link>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre prénom"
            required
            {...register("firstname")}
            id="firstname"
            name="firstname"
            type="firstname"
          />
          <p className="error">{errors?.firstname?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre nom"
            required
            {...register("name")}
            id="name"
            name="name"
            type="text"
          />
          <p className="error">{errors?.name?.message}</p>
        </div>

        <div className="containerMiniChamp">
          <div className="champ">
            <TextField
              className="mui-input"
              fullWidth
              variant="outlined"
              label="Votre ville"
              {...register("city")}
              id="city"
              name="city"
              type="text"
            />
            <p className="error">{errors?.city?.message}</p>
          </div>
          <div className="champ">
            <TextField
              className="mui-input"
              fullWidth
              variant="outlined"
              label="Votre code postal"
              {...register("codePostal")}
              id="codePostal"
              name="codePostal"
              type="text"
            />
            <p className="error">{errors?.codePostal?.message}</p>
          </div>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre numéro de téléphone"
            {...register("phone")}
            id="phone"
            name="phone"
            type="text"
          />
          <p className="error">{errors?.phone?.message}</p>
        </div>

        <hr />

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre email"
            required
            {...register("email")}
            id="email"
            type="text"
            name="email"
          />
          <p className="error">{errors?.email?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre mot de passe"
            required
            {...register("password")}
            id="password"
            name="password"
            type="password"
          />
          <p className="error">{errors?.password?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          SUIVANT <FaArrowRight />
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default inscription;
