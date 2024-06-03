import React from "react";
import { useRouter } from "next/router";
import { EpreuveCreateEntity, useCreateEpreuveMutation } from "@/types/graphql";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

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
            router.push(`/epreuve/${data.createEpreuve.id}`);
          }
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  };

  return (
    <main className="createEpreuve">
      <h1>create epreuve</h1>

      <form onSubmit={handleSubmit(handleCreateEpreuve)}>
        <div>
          <label htmlFor="title">Le titre de l'épreuve</label>
          <input
            {...register("title")}
            id="title"
            name="title"
            type="text"
            placeholder="Indiquez votre titre"
          />
          <p className="error">{errors?.title?.message}</p>
        </div>
        <div>
          <label htmlFor="description">La description de l'épreuve</label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            placeholder="La description de l'épreuve"
          ></textarea>
          <p className="error">{errors?.description?.message}</p>
        </div>

        <div>
          <label htmlFor="easyToDo">Que faire (version débutant)</label>
          <textarea
            {...register("easyToDo")}
            id="easyToDo"
            name="easyToDo"
            placeholder="Que faire (version débutant)"
          ></textarea>
          <p className="error">{errors?.easyToDo?.message}</p>
        </div>
        <div>
          <label htmlFor="mediumToDo">Que faire (version intermédiaire)</label>
          <textarea
            {...register("mediumToDo")}
            id="mediumToDo"
            name="mediumToDo"
            placeholder="Que faire (version medium)"
          ></textarea>
          <p className="error">{errors?.mediumToDo?.message}</p>
        </div>
        <div>
          <label htmlFor="hardToDo">Que faire (version confirmé)</label>
          <textarea
            {...register("hardToDo")}
            id="hardToDo"
            name="hardToDo"
            placeholder="Que faire (version hard)"
          ></textarea>
          <p className="error">{errors?.hardToDo?.message}</p>
        </div>

        <div>
          <label htmlFor="videoLink">Le lien video</label>
          <input
            {...register("videoLink")}
            id="videoLink"
            name="videoLink"
            type="text"
            placeholder="Le lien video"
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
