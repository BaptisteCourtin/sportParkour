import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { object, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  UserInputRegisterEntity,
  useInscriptionMutation,
} from "@/types/graphql";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import SearchBarCommuneName from "@/components/user/searchBarCommuneName";

import {
  LENGTH_EMAIL,
  LENGTH_MIN_PASSWORD,
  LENGTH_NOM,
  LENGTH_MAX_PASSWORD,
  LENGTH_PHONE,
} from "../../../../variablesLength";

let authSchema = object({
  email: string()
    .max(LENGTH_EMAIL)
    .email("Votre email doit être valide")
    .required("Veuillez entrer votre email"),
  password: string()
    .min(
      LENGTH_MIN_PASSWORD,
      `Utilisez un mot de passe avec au moins ${LENGTH_MIN_PASSWORD} caractères`
    )
    .max(
      LENGTH_MAX_PASSWORD,
      `Utilisez un mot de passe avec au maximum ${LENGTH_MAX_PASSWORD} caractères`
    )
    .matches(/[A-Z]/, "Utilisez au moins une majuscule")
    .matches(/[a-z]/, "Utilisez au moins une minuscule")
    .matches(/[0-9]/, "Utilisez au moins un chiffre")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Utilisez au moins un caractère spécial")
    .required("Veuillez entrer votre mot de passe"),
  password2: string()
    .oneOf([ref("password")], "Les mots de passe ne correspondent pas")
    .required("Veuillez confirmer votre mot de passe"),

  name: string().max(LENGTH_NOM).required("Veuillez entrer votre nom"),
  firstname: string().max(LENGTH_NOM).required("Veuillez entrer votre prénom"),

  phone: string()
    .max(LENGTH_PHONE, "tapez votre numéro sans espace et sans le +33")
    .test(
      "len",
      "tapez les 10 chiffres de votre numéro, sans espace et sans le +33",
      (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || val.length == LENGTH_PHONE;
      }
    ),
});

interface UserInputRegisterWith2PasswordsEntity
  extends UserInputRegisterEntity {
  password2: string;
}

// -----------------------------------------------------------------------------------

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

  const handleInscription = (
    dataForm: UserInputRegisterWith2PasswordsEntity
  ): void => {
    const { password2, codePostal, ...data } = dataForm;
    const infos = {
      city: selectedCommuneName,
      codePostal: selectedCommuneCodePostal,
      ...data,
    };

    inscription({
      variables: { infos: infos },
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
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    firstname: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- SEE PASSWORDS ---
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // --- API COMMUNES ---
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [selectedCommuneCodePostal, setSelectedCommuneCodePostal] =
    useState("");

  return (
    <main className="auth">
      <div className="imageTop">
        <h1>POSSEDEZ UN COMPTE PARKOUR</h1>
      </div>

      <form onSubmit={handleSubmit(handleInscription)} className="bigForm">
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
            inputProps={{ maxLength: LENGTH_NOM }}
            onChange={(e) => handleChangeAThing("firstname", e.target.value)}
          />
          <span>
            {values.firstname.length > 0
              ? `${values.firstname.length}/${LENGTH_NOM}`
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
            inputProps={{ maxLength: LENGTH_NOM }}
            onChange={(e) => handleChangeAThing("name", e.target.value)}
          />
          <span>
            {values.name.length > 0
              ? `${values.name.length}/${LENGTH_NOM}`
              : ""}
          </span>
          <p className="error">{errors?.name?.message}</p>
        </div>

        <div className="containerMiniChamp">
          <div className="champ">
            <SearchBarCommuneName
              userValue={selectedCommuneName}
              setSelectedCommuneName={setSelectedCommuneName}
              setSelectedCommuneCodePostal={setSelectedCommuneCodePostal}
            />
          </div>

          <div className="champ">
            <TextField
              className="mui-input codePostal"
              fullWidth
              variant="outlined"
              label="Votre code postal"
              value={selectedCommuneCodePostal}
              id="codePostal"
              name="codePostal"
              type="text"
              InputProps={{
                readOnly: true,
              }}
            />
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
            inputProps={{ maxLength: LENGTH_PHONE }}
            onChange={(e) => handleChangeAThing("phone", e.target.value)}
          />
          <span>
            {values.phone.length > 0
              ? `${values.phone.length}/${LENGTH_PHONE}`
              : ""}
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
            inputProps={{ maxLength: LENGTH_EMAIL }}
            onChange={(e) => handleChangeAThing("email", e.target.value)}
          />
          <span>
            {values.email.length > 0
              ? `${values.email.length}/${LENGTH_EMAIL}`
              : ""}
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
            type={showPassword ? "text" : "password"}
            inputProps={{ maxLength: LENGTH_MAX_PASSWORD }}
            onChange={(e) => handleChangeAThing("password", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className="buttonEye">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <span>
            {values.password.length > 0
              ? `${values.password.length}/${LENGTH_MAX_PASSWORD}`
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
            inputProps={{ maxLength: LENGTH_MAX_PASSWORD }}
            onChange={(e) => handleChangeAThing("password2", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className="buttonEye">
                  <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <span>
            {values.password2.length > 0
              ? `${values.password2.length}/${LENGTH_MAX_PASSWORD}`
              : ""}
          </span>
          <p className="error">{errors?.password2?.message}</p>
        </div>

        <FormControlLabel
          required
          control={<Checkbox />}
          label="j'accepte les CGU"
          data-testid="accept-cgu-checkbox"
        />
        <div className="legale">
          <Link href="/infos/cgu">Voir les CGU</Link>
          <Link href="/infos/mentionsLegales">Voir les mentions légales</Link>
          <Link href="/infos/politiqueDeConfidentialite">
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
