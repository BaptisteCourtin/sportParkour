import React, { useState } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

let authSchema = object({
  email: string()
    .max(255)
    .email("Votre email doit être valide")
    .required("Veuillez entrer votre email"),
  password: string()
    .min(12, "Utilisez un mot de passe avec au moins 12 caractères")
    .max(100, "Utilisez un mot de passe avec au maximum 100 caractères")
    .required("Veuillez entrer votre mot de passe"),
  name: string().max(100).required("Veuillez entrer votre nom"),
  firstname: string().max(100).required("Veuillez entrer votre prénom"),

  city: string().max(50),
  codePostal: string()
    .max(5, "un code postal comprend 5 chiffres")
    .test("len", "un code postal comprend 5 chiffres", (val) => {
      if (val == undefined) {
        return true;
      }
      return val.length == 0 || val.length == 5;
    }),
  phone: string()
    .max(10, "tapez votre numéro sans espace et sans le +33")
    .test(
      "len",
      "tapez les 10 chiffres de votre numéro, sans espace et sans le +33",
      (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || val.length == 10;
      }
    ),
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

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    firstname: "",
    name: "",
    city: "",
    codePostal: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
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
            inputProps={{ maxLength: 100 }}
            onChange={(e) => handleChangeAThing("firstname", e.target.value)}
          />
          <span>
            {values.firstname.length > 0
              ? `${values.firstname.length}/100`
              : ""}
          </span>
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
            inputProps={{ maxLength: 100 }}
            onChange={(e) => handleChangeAThing("name", e.target.value)}
          />
          <span>
            {values.name.length > 0 ? `${values.name.length}/100` : ""}
          </span>
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
              inputProps={{ maxLength: 50 }}
              onChange={(e) => handleChangeAThing("city", e.target.value)}
            />
            <span>
              {values.city.length > 0 ? `${values.city.length}/50` : ""}
            </span>
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
              inputProps={{ maxLength: 5 }}
              onChange={(e) => handleChangeAThing("codePostal", e.target.value)}
            />
            <span>
              {values.codePostal.length > 0
                ? `${values.codePostal.length}/5`
                : ""}
            </span>
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
            inputProps={{ maxLength: 10 }}
            onChange={(e) => handleChangeAThing("phone", e.target.value)}
          />
          <span>
            {values.phone.length > 0 ? `${values.phone.length}/10` : ""}
          </span>
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
            name="email"
            type="text"
            inputProps={{ maxLength: 255 }}
            onChange={(e) => handleChangeAThing("email", e.target.value)}
          />
          <span>
            {values.email.length > 0 ? `${values.email.length}/255` : ""}
          </span>
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
            inputProps={{ maxLength: 100 }}
            onChange={(e) => handleChangeAThing("password", e.target.value)}
          />
          <span>
            {values.password.length > 0 ? `${values.password.length}/100` : ""}
          </span>
          <p className="error">{errors?.password?.message}</p>
        </div>

        <FormControlLabel
          required
          control={<Checkbox />}
          label="j'accepte les CGU"
        />
        <div className="legale">
          <Link href="/cgu">Voir les CGU</Link>
          <Link href="/mentionsLegales">Voir les mentions légales</Link>
          <Link href="/politiquueDeConfidentialite">
            Voir la politique de confidentialité
          </Link>
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
