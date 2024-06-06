import React from "react";
import { useRouter } from "next/router";
import { EpreuveCreateEntity, useCreateEpreuveMutation } from "@/types/graphql";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";

let createEpreuveSchema = object({
  title: string().required("Veuillez entrer un titre"),
  description: string(),
  easyToDo: string(),
  mediumToDo: string(),
  hardToDo: string(),
  videoLink: string(),
});

const createEpreuve = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEpreuveSchema),
  });

  const [createEpreuve, { data, loading, error }] = useCreateEpreuveMutation({
    fetchPolicy: "no-cache",
  });

  const handleCreateEpreuve = (dataForm: EpreuveCreateEntity): void => {
    if (dataForm.title) {
      createEpreuve({
        variables: { infos: dataForm },
        onCompleted(data) {
          if (data.createEpreuve.id) {
            toast.success(
              `GG, vous avez créé l'épreuve ${data.createEpreuve.title}`
            );
            router.push(`/epreuve/${data.createEpreuve.id}`);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <main className="createEpreuve">
      <h1>create epreuve</h1>

      <form onSubmit={handleSubmit(handleCreateEpreuve)}>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Titre de l'épreuve"
            required
            {...register("title")}
            id="title"
            name="title"
            type="text"
          />
          <p className="error">{errors?.title?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Description global"
            multiline
            rows={10}
            {...register("description")}
            id="description"
            name="description"
            type="text"
          />
          <p className="error">{errors?.description?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version débutant)"
            multiline
            rows={6}
            {...register("easyToDo")}
            id="easyToDo"
            name="easyToDo"
            type="text"
          />
          <p className="error">{errors?.easyToDo?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version medium)"
            multiline
            rows={6}
            {...register("mediumToDo")}
            id="mediumToDo"
            name="mediumToDo"
            type="text"
          />
          <p className="error">{errors?.mediumToDo?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version hard)"
            multiline
            rows={6}
            {...register("hardToDo")}
            id="hardToDo"
            name="hardToDo"
            type="text"
          />
          <p className="error">{errors?.hardToDo?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Le lien video"
            {...register("videoLink")}
            id="videoLink"
            name="videoLink"
            type="text"
          />
          <p className="error">{errors?.videoLink?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Créer l'épreuve
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default createEpreuve;
