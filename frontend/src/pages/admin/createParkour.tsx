import React from "react";
import { useRouter } from "next/router";
import { ParkourCreateEntity, useCreateParkourMutation } from "@/types/graphql";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

let createParkourSchema = object({
  title: string().required("Veuillez entrer un titre"),
  description: string(),

  time: string(),
  length: string(),
  difficulty: string(),

  city: string(),
  start: string(),

  epreuves: string(),
});

const createParkour = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createParkourSchema),
  });

  const [createParkour, { data, loading, error }] = useCreateParkourMutation({
    fetchPolicy: "no-cache",
  });

  const handleCreateParkour = (dataForm: ParkourCreateEntity): void => {
    if (dataForm.title) {
      createParkour({
        variables: { infos: dataForm },
        onCompleted(data) {
          if (data.createParkour.id) {
            toast.success(
              `GG, vous avez créé l'épreuve ${data.createParkour.title}`
            );
            router.push(`/parkour/${data.createParkour.id}`);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <main className="createParkour">
      <h1>create parkour</h1>

      <form onSubmit={handleSubmit(handleCreateParkour)}>
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
          <label htmlFor="time">le temps moyen</label>
          <textarea
            {...register("time")}
            id="time"
            name="time"
            placeholder="le temps moyen"
          ></textarea>
          <p className="error">{errors?.time?.message}</p>
        </div>
        <div>
          <label htmlFor="length">Longueur du parkour</label>
          <textarea
            {...register("length")}
            id="length"
            name="length"
            placeholder="Longueur du parkour"
          ></textarea>
          <p className="error">{errors?.length?.message}</p>
        </div>

        {/* à modifier pour un choose */}
        <div>
          <label htmlFor="difficulty">Difficultée</label>
          <textarea
            {...register("difficulty")}
            id="difficulty"
            name="difficulty"
            placeholder="Difficultée"
          ></textarea>
          <p className="error">{errors?.difficulty?.message}</p>
        </div>

        <div>
          <label htmlFor="city">Ville de départ</label>
          <input
            {...register("city")}
            id="city"
            name="city"
            type="text"
            placeholder="Ville de départ"
          />
          <p className="error">{errors?.city?.message}</p>
        </div>
        <div>
          <label htmlFor="start">point gps de départ</label>
          <input
            {...register("start")}
            id="start"
            name="start"
            type="text"
            placeholder="point gps de départ"
          />
          <p className="error">{errors?.start?.message}</p>
        </div>

        {/* modifier pour choose many */}
        <div>
          <label htmlFor="epreuves">Liste d'épreuves</label>
          <input
            {...register("epreuves")}
            id="epreuves"
            name="epreuves"
            type="text"
            placeholder="Liste d'épreuves"
          />
          <p className="error">{errors?.epreuves?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Créer le parkour
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default createParkour;
