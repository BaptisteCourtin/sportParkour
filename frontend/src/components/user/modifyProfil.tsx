import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next-router-mock";

import { useModifyUserMutation } from "@/types/graphql";

import { InferType, mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { FaUser } from "react-icons/fa6";
import { toast } from "react-hot-toast";

import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import { uploadImageProfil } from "@/components/uploadImage/uploadImageProfil";

let modifyUserSchema = object({
  imageProfil: mixed<FileList>(),

  email: string()
    .email("Votre email doit être valide")
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL))
    .required("Veuillez entrer votre email"),
  name: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM))
    .required("Veuillez entrer votre nom"),
  firstname: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM))
    .required("Veuillez entrer votre prénom"),

  phone: string()
    .max(
      parseInt(process.env.NEXT_PUBLIC_LENGTH_PHONE),
      "tapez votre numéro sans espace et sans le +33"
    )
    .test(
      "len",
      "tapez les 10 chiffres de votre numéro, sans espace et sans le +33",
      (val) => {
        if (val == undefined) {
          return true;
        }
        return (
          val.length == 0 ||
          val.length == parseInt(process.env.NEXT_PUBLIC_LENGTH_PHONE)
        );
      }
    ),
});

// on peut pas utiliser UserUpdateEntity à cause du FileList qui va devenir un string
type FormType = InferType<typeof modifyUserSchema>;

const modifyProfil = ({ dataProfil, setIsModifMode, isModifMode }) => {
  const router = useRouter();

  useEffect(() => {
    setSelectedCommuneName(dataProfil.city ? dataProfil.city : "");
    setSelectedCommuneCodePostal(
      dataProfil.codePostal ? dataProfil.codePostal : ""
    );
  }, [dataProfil]);

  // --- MODIFY USER ---
  const [preview, setPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(modifyUserSchema),
  });

  const [
    modifyUser,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyUserMutation();

  const handleModifyUser = async ({
    imageProfil,
    ...dataForm
  }: FormType): Promise<void> => {
    let imageProfilLien: string | null = null;
    if (imageProfil?.length) {
      imageProfilLien = await uploadImageProfil(imageProfil); // fonction à part
    }

    const infos = {
      city: selectedCommuneName,
      codePostal: selectedCommuneCodePostal,
      imageProfil: imageProfilLien,
      ...dataForm,
    };

    modifyUser({
      variables: { infos: infos },
      onCompleted(data) {
        if (data.modifyUser.success) {
          setIsModifMode(false);
          toast.success(data.modifyUser.message);
          router.push(`/user/profil`);
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  // --- DEAL WITH process.env.LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    firstname: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- API COMMUNES ---
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [selectedCommuneCodePostal, setSelectedCommuneCodePostal] =
    useState("");

  return (
    <>
      <form className="bigForm" onSubmit={handleSubmit(handleModifyUser)}>
        <button
          className="closeModif"
          onClick={() => setIsModifMode(!isModifMode)}
        >
          Arrêter de modifier mon profil
        </button>

        <div className="champ imageInput">
          <label htmlFor="img-profil">
            <input
              id="img-profil"
              type="file"
              accept="image/*"
              {...register("imageProfil", {
                onChange(e) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                },
              })}
              placeholder="Photo"
            />

            <div className="container-imageProfil">
              {dataProfil.imageProfil ? (
                <img
                  className="photoProfil"
                  src={dataProfil.imageProfil}
                  alt="avatar"
                />
              ) : (
                <FaUser className="photoProfil" />
              )}
            </div>
          </label>

          <p>{errors?.imageProfil?.message}</p>
          {preview && (
            <div>
              <img src={preview} alt="preview" width={50} height={50} />
            </div>
          )}
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre prénom"
            defaultValue={dataProfil.firstname}
            required
            {...register("firstname")}
            id="firstname"
            name="firstname"
            type="firstname"
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_NOM }}
            onChange={(e) => handleChangeAThing("firstname", e.target.value)}
          />
          <span>
            {values.firstname.length > 0
              ? `${values.firstname.length}/${process.env.NEXT_PUBLIC_LENGTH_NOM}`
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
            defaultValue={dataProfil.name}
            required
            {...register("name")}
            id="name"
            name="name"
            type="text"
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_NOM }}
            onChange={(e) => handleChangeAThing("name", e.target.value)}
          />
          <span>
            {values.name.length > 0
              ? `${values.name.length}/${process.env.NEXT_PUBLIC_LENGTH_NOM}`
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
            defaultValue={dataProfil.phone}
            {...register("phone")}
            id="phone"
            name="phone"
            type="text"
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_PHONE }}
            onChange={(e) => handleChangeAThing("phone", e.target.value)}
          />
          <span>
            {values.phone.length > 0
              ? `${values.phone.length}/${process.env.NEXT_PUBLIC_LENGTH_PHONE}`
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
            defaultValue={dataProfil.email}
            required
            {...register("email")}
            id="email"
            type="text"
            name="email"
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_EMAIL }}
            onChange={(e) => handleChangeAThing("email", e.target.value)}
          />
          <span>
            {values.email.length > 0
              ? `${values.email.length}/${process.env.NEXT_PUBLIC_LENGTH_EMAIL}`
              : ""}
          </span>
          <p className="error">{errors?.email?.message}</p>
        </div>

        <button type="submit" disabled={loadingModify}>
          Enregistrer
        </button>

        <div>
          <span>{errorModify?.message}</span>
        </div>
      </form>

      <Link
        className="oublie button danger"
        href="/auth/resetPassword/resetPassword"
      >
        Modifier mon mot de passe
      </Link>
    </>
  );
};

export default modifyProfil;
