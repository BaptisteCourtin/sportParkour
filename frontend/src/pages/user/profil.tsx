import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useDeleteUserMutation,
  useGetUserByTokenLazyQuery,
  useIsAdminQuery,
  useIsClientQuery,
  useModifyUserMutation,
  UserUpdateEntity,
} from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-hot-toast";

import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import axiosInstanceImage from "@/lib/axiosInstanceImage";
import { FaUser } from "react-icons/fa6";

let modifyUserSchema = object({
  imageProfil: mixed<FileList>(),

  email: string()
    .email("Votre email doit être valide")
    .max(255)
    .required("Veuillez entrer votre email"),
  name: string().max(100).required("Veuillez entrer votre nom"),
  firstname: string().max(100).required("Veuillez entrer votre prénom"),

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

// on peut pas utiliser UserUpdateEntity à cause du FileList qui va devenir un string
type FormType = {
  email: string;
  name: string;
  firstname: string;
  phone?: string;
  city?: string;
  codePostal?: string;
  imageProfil?: FileList;
};

// mettre les infos dans un form
const profil = () => {
  const router = useRouter();
  const [isModifMode, setIsModifMode] = useState(false);

  const {
    data: dataIsClient,
    loading: loadingIsClient,
    error: errorIsClient,
  } = useIsClientQuery();

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const [getUser, { data, loading, error }] = useGetUserByTokenLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getUser({
      onCompleted(data) {
        setSelectedCommuneName(
          data.getUserByToken.city ? data.getUserByToken.city : ""
        );
        setSelectedCommuneCodePostal(
          data.getUserByToken.codePostal ? data.getUserByToken.codePostal : ""
        );
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, [isModifMode]);

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
  ] = useModifyUserMutation({
    fetchPolicy: "no-cache",
  });

  const handleModifyUser = ({ imageProfil, ...dataForm }: FormType): void => {
    const { codePostal, ...data } = dataForm;
    const infos = {
      city: selectedCommuneName,
      codePostal: selectedCommuneCodePostal,
      ...data,
    };

    if (imageProfil?.length) {
      const formData = new FormData();
      formData.append("file", imageProfil[0], imageProfil[0].name);

      axiosInstanceImage
        .post("/uploadPhotoProfil", formData)
        .then((resultImage) => {
          console.log(resultImage);
          const imageProfilLien =
            "https://storage.cloud.google.com" +
            resultImage.data.split("https://storage.googleapis.com")[1];
          modifyUser({
            variables: {
              infos: { ...infos, imageProfil: imageProfilLien },
            },
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
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
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
    }
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
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

  // --- DELETE USER ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteUser, { loading: loadingDelete, error: errorDelete }] =
    useDeleteUserMutation();

  function handleDeleteUser(id: string): void {
    if (id) {
      deleteUser({
        onCompleted(data) {
          toast.success(data.deleteUser.message);
          router.push(`/`);
        },
        onError(error) {
          toast.success(error.message);
        },
      });
    }
  }

  // --- API COMMUNES ---
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [selectedCommuneCodePostal, setSelectedCommuneCodePostal] =
    useState("");

  return (
    <main className="profil">
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByToken && (
          <>
            <button
              className="isModif"
              onClick={() => setIsModifMode(!isModifMode)}
            >
              {isModifMode
                ? "Arreter de modifier mon profil"
                : "Modifier mon profil"}
            </button>
            {isModifMode ? (
              // --- modif ---
              <>
                <form
                  className="modifProfil"
                  onSubmit={handleSubmit(handleModifyUser)}
                >
                  <div className="champ">
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

                      {data.getUserByToken.imageProfil ? (
                        <img
                          className="photoProfil"
                          src={data.getUserByToken.imageProfil}
                          alt="avatar"
                        />
                      ) : (
                        <FaUser />
                      )}
                    </label>

                    <p>{errors?.imageProfil?.message}</p>
                    {preview && (
                      <div>
                        <img
                          src={preview}
                          alt="preview"
                          width={50}
                          height={50}
                        />
                      </div>
                    )}
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre prénom"
                      defaultValue={data.getUserByToken.firstname}
                      required
                      {...register("firstname")}
                      id="firstname"
                      name="firstname"
                      type="firstname"
                      inputProps={{ maxLength: 100 }}
                      onChange={(e) =>
                        handleChangeAThing("firstname", e.target.value)
                      }
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
                      defaultValue={data.getUserByToken.name}
                      required
                      {...register("name")}
                      id="name"
                      name="name"
                      type="text"
                      inputProps={{ maxLength: 100 }}
                      onChange={(e) =>
                        handleChangeAThing("name", e.target.value)
                      }
                    />
                    <span>
                      {values.name.length > 0
                        ? `${values.name.length}/100`
                        : ""}
                    </span>
                    <p className="error">{errors?.name?.message}</p>
                  </div>

                  <div className="containerMiniChamp">
                    <div className="champ">
                      <SearchBarCommuneName
                        userValue={selectedCommuneName}
                        setSelectedCommuneName={setSelectedCommuneName}
                        setSelectedCommuneCodePostal={
                          setSelectedCommuneCodePostal
                        }
                      />
                    </div>

                    <div className="champ">
                      <TextField
                        className="mui-input"
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
                      defaultValue={data.getUserByToken.phone}
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="text"
                      inputProps={{ maxLength: 10 }}
                      onChange={(e) =>
                        handleChangeAThing("phone", e.target.value)
                      }
                    />
                    <span>
                      {values.phone.length > 0
                        ? `${values.phone.length}/10`
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
                      defaultValue={data.getUserByToken.email}
                      required
                      {...register("email")}
                      id="email"
                      type="text"
                      name="email"
                      inputProps={{ maxLength: 255 }}
                      onChange={(e) =>
                        handleChangeAThing("email", e.target.value)
                      }
                    />
                    <span>
                      {values.email.length > 0
                        ? `${values.email.length}/255`
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
                  className="oublie"
                  href="/auth/resetPassword/resetPassword"
                >
                  Modifier mon mot de passe
                </Link>
              </>
            ) : (
              // --- profil ---
              <section className="seeProfil">
                {data.getUserByToken.imageProfil ? (
                  <img
                    className="photoProfil"
                    src={data.getUserByToken.imageProfil}
                    alt="avatar"
                  />
                ) : (
                  <FaUser className="photoProfil" />
                )}
                <br />
                <br />
                <p>nom : {data.getUserByToken.name}</p>
                <br />
                <br />
                <p>prénom : {data.getUserByToken.firstname}</p>
                <br />
                <br />
                <p>email : {data.getUserByToken.email}</p>
                <br />
                <br />
                <p>ville : {data.getUserByToken.city}</p>
                <br />
                <br />
                <p>codePostal : {data.getUserByToken.codePostal}</p>
                <br />
                <br />
                <p>phone : {data.getUserByToken.phone}</p>
              </section>
            )}
            {/* --- favoris / note / modo --- */}
            {dataIsClient ? (
              <Link href="/user/favoris">mes favoris</Link>
            ) : null}
            {dataIsClient ? (
              <Link href="/user/notes">mes notes et commentaires</Link>
            ) : null}
            {dataIsAdmin ? (
              <Link href="/admin/reports/recherche">go modo un peu là</Link>
            ) : null}
            {/* --- supp --- */}
            <div className="supp">
              <Button variant="outlined" onClick={handleClickOpen}>
                Supprimer votre profil
              </Button>
              <Dialog
                open={open}
                onClose={handleClickClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                      (formData as any).entries()
                    );
                    const emailUser = formJson.emailUser;

                    if (data.getUserByToken.email == emailUser) {
                      handleDeleteUser(data.getUserByToken.id);

                      if (errorDelete) {
                        handleClickClose();
                        toast.error(errorDelete?.message);
                      }
                    } else {
                      handleClickClose();
                      toast.error("L'email ne correspond pas");
                    }
                  },
                }}
              >
                <DialogTitle>Vous êtes entrain de vous supprimer</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer cette user entrez son nom :
                    {data.getUserByToken.email}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    fullWidth
                    variant="standard"
                    required
                    margin="dense"
                    id="emailUser"
                    name="emailUser"
                    label="votre email"
                    type="email"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>En fait, non</Button>
                  <Button type="submit">Hop, ça dégage!</Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )
      )}
      <Link href="/user/logout">se déconnecter</Link>
    </main>
  );
};

export default profil;
