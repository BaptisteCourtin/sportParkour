import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CheckResetTokenQuery,
  CheckResetTokenQueryVariables,
  useChangePasswordMutation,
  useCheckResetTokenLazyQuery,
} from "@/types/graphql";
import { useEffect, useState } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { object, ref, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

let PasswordsResetPasswordSchema = object({
  password: string()
    .min(12, "Utilisez un mot de passe avec au moins 12 caractères")
    .max(100, "Utilisez un mot de passe avec au maximum 100 caractères")
    .matches(/[A-Z]/, "Utilisez au moins une majuscule")
    .matches(/[a-z]/, "Utilisez au moins une minuscule")
    .matches(/[0-9]/, "Utilisez au moins un chiffre")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Utilisez au moins un caractère spécial")
    .required("Veuillez entrer votre mot de passe"),
  password2: string()
    .oneOf([ref("password")], "Les mots de passe ne correspondent pas")
    .required("Veuillez confirmer votre mot de passe"),
});

interface PasswordsResetPasswordFormData {
  password: string;
  password2: string;
}

function Reset() {
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordsResetPasswordSchema),
  });

  // -----------------------------------------------------------------------------------

  const [
    checkToken,
    { data: dataCheck, loading: loadingCheck, error: errorCheck },
  ] = useCheckResetTokenLazyQuery();

  const [
    changePassword,
    { data: dataChange, loading: loadingChange, error: errorChange },
  ] = useChangePasswordMutation();

  useEffect(() => {
    if (router.isReady && token) {
      if (token) {
        checkToken({
          variables: {
            token: token as string,
          },
        });
      }
    }
  }, [router.isReady]);

  // --- RESET PASSWORD ---

  const handlePasswordsResetPassword = ({
    password,
  }: PasswordsResetPasswordFormData): void => {
    const token = router.query.token;
    if (token) {
      changePassword({
        variables: {
          data: { password: password, token: token as string },
        },
      });
    }
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    password: "",
    password2: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- SEE PASSWORDS ---
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <main>
      {loadingCheck ? (
        <p>Vérification en cours</p>
      ) : dataCheck?.checkResetToken.success && !dataChange ? (
        <>
          <h1>Réinitialisation de mot de passe</h1>
          <form onSubmit={handleSubmit(handlePasswordsResetPassword)}>
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
                type={showPassword ? "text" : "password"}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => handleChangeAThing("password", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span>
                {values.password.length > 0
                  ? `${values.password.length}/100`
                  : ""}
              </span>
              <p className="error">{errors?.password?.message}</p>
            </div>
            <div className="champ">
              <TextField
                className="mui-input"
                fullWidth
                variant="outlined"
                label="Réécrivez votre mot de passe"
                required
                {...register("password2")}
                id="password2"
                name="password2"
                type={showPassword2 ? "text" : "password"}
                inputProps={{ maxLength: 100 }}
                onChange={(e) =>
                  handleChangeAThing("password2", e.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword2(!showPassword2)}
                      >
                        {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span>
                {values.password2.length > 0
                  ? `${values.password2.length}/100`
                  : ""}
              </span>
              <p className="error">{errors?.password2?.message}</p>
            </div>
            <button type="submit" disabled={loadingChange}>
              Changer mon mot de passe
            </button>
          </form>
        </>
      ) : dataChange?.changePassword.success ? (
        <div>
          <Link href="/auth/login">{dataChange?.changePassword.message}</Link>
        </div>
      ) : (
        <div>
          Vous n'avez pas un jeton valide, merci de relancer la réinitialisation
          du mot de passe
        </div>
      )}
    </main>
  );
}

export default Reset;
