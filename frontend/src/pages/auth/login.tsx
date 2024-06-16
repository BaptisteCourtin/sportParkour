import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserInputAuthEntity,
  useAuthentificationLazyQuery,
} from "@/types/graphql";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { FaArrowRight } from "react-icons/fa6";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

let loginSchema = object({
  email: string()
    .email("Votre email doit être valide")
    .required("Veuillez entrer votre email"),
  password: string()
    // .min(12, "Votre mot de passe fait au moins 12 caractères") // pour que je continue à utiliser 0000
    .max(100, "Votre mot de passe fait moins de 100 caractères")
    .required("Veuillez entrer votre mot de passe"),
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
            toast.success(data.authentification.message);
            router.push("/");
          } else {
            toast.success(data.authentification.message);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  // --- SEE PASSWORDS ---
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="auth">
      <div className="imageTop">
        <h1>UTILISEZ VOTRE ESPACE PERSONNEL</h1>
      </div>

      <form onSubmit={handleSubmit(handleAuthentification)}>
        <div className="topForm">
          <h2>CONNECTEZ VOUS</h2>
          <Link className="inscr" href="/auth/inscription">
            Vous voulez un compte ?
          </Link>
        </div>
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
            inputProps={{ maxLength: 255 }}
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
            type={showPassword ? "text" : "password"}
            name="password"
            inputProps={{ maxLength: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p className="error">{errors?.password?.message}</p>
        </div>

        <Link className="oublie" href="/auth/resetPassword/resetPassword">
          Mot de passe oublié ?
        </Link>

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

export default login;
