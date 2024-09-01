import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  MailToAdminEntity,
  SujetMailToAdmin,
  useCreateMailToAdminMutation,
} from "@/types/graphql";

import { mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-hot-toast";

import GoBack from "@/components/goBack";

let mailToAdminSchema = object({
  name: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM))
    .required("Veuillez entrer votre nom"),
  firstname: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM))
    .required("Veuillez entrer votre prénom"),
  emailUser: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL))
    .email("Votre email doit être valide")
    .required("Veuillez entrer votre email"),
  sujet: mixed<SujetMailToAdmin>().oneOf(Object.values(SujetMailToAdmin)),
  messageToAdmin: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_MESSAGETOADMIN),
    "ça va suffir"
  ),
});

// -----------------------------------------------------------------------------------

const mailToAdmin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mailToAdminSchema),
  });

  const [choosenSujetMailToAdmin, setChoosenSujetMailToAdmin] =
    useState<SujetMailToAdmin>();

  const [createMailToAdmin, { data, loading, error }] =
    useCreateMailToAdminMutation();

  const handleInscription = (dataForm: any): void => {
    const dataAggregate: MailToAdminEntity = {
      ...dataForm,
      sujet: choosenSujetMailToAdmin,
    };

    createMailToAdmin({
      variables: { infos: dataAggregate },
      onCompleted(data) {
        if (data.createMailToAdmin.success) {
          toast.success(data.createMailToAdmin.message);
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
    emailUser: "",
    messageToAdmin: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <main className="mailToAdmin">
      <GoBack />

      <h1>Envoyer un mail à notre admin</h1>

      <form onSubmit={handleSubmit(handleInscription)} className="bigForm">
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

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre email"
            required
            {...register("emailUser")}
            id="emailUser"
            name="emailUser"
            type="text"
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_EMAIL }}
            onChange={(e) => handleChangeAThing("emailUser", e.target.value)}
          />
          <span>
            {values.emailUser.length > 0
              ? `${values.emailUser.length}/${process.env.NEXT_PUBLIC_LENGTH_EMAIL}`
              : ""}
          </span>
          <p className="error">{errors?.emailUser?.message}</p>
        </div>

        <hr />

        <div className="champ sujet">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Sujet</InputLabel>
            <Select
              className="mui-input"
              variant="outlined"
              id="sujet"
              name="sujet"
              label="Difficultée"
              required
              onChange={(e) =>
                setChoosenSujetMailToAdmin(e.target.value as SujetMailToAdmin)
              }
            >
              <MenuItem value="SITE">par rapport au site</MenuItem>
              <MenuItem value="EPREUVE">par rapport à une épreuve</MenuItem>
              <MenuItem value="PARKOUR">par rapport à un parkour</MenuItem>
              <MenuItem value="CLIENT">par rapport à moi</MenuItem>
            </Select>
          </FormControl>
          <p className="error">{errors?.sujet?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Votre gentil message"
            multiline
            rows={10}
            {...register("messageToAdmin")}
            id="messageToAdmin"
            name="messageToAdmin"
            type="text"
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_MESSAGETOADMIN,
            }}
            onChange={(e) =>
              handleChangeAThing("messageToAdmin", e.target.value)
            }
          />
          <span>
            {values.messageToAdmin.length > 0
              ? `${values.messageToAdmin.length}/${process.env.NEXT_PUBLIC_LENGTH_MESSAGETOADMIN}`
              : ""}
          </span>
          <p className="error">{errors?.messageToAdmin?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Envoyer <FaArrowRight />
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default mailToAdmin;
