import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useResetPasswordMutation } from "@/types/graphql";

import TextField from "@mui/material/TextField";

import toast from "react-hot-toast";

let EmailResetPasswordSchema = object({
  email: string()
    .max(255)
    .email("Votre email doit être valide")
    .required("Veuillez entrer votre email"),
});

interface EmailResetPasswordFormData {
  email: string;
}

// -----------------------------------------------------------------------------------

function ResetByEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmailResetPasswordSchema),
  });

  const [resetPassword, { data, loading, error }] = useResetPasswordMutation();

  const handleEmailResetPassword = ({
    email,
  }: EmailResetPasswordFormData): void => {
    resetPassword({
      variables: { email: email },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    email: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <main>
      {/* pas encore de data de la mutation */}
      {!data?.resetPassword.resetToken ? (
        <form onSubmit={handleSubmit(handleEmailResetPassword)}>
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
          <button type="submit" disabled={loading}>
            M'envoyer un email
          </button>
        </form>
      ) : (
        <div>
          <p>Vérifiez vos emails</p>
        </div>
      )}
    </main>
  );
}

export default ResetByEmail;
