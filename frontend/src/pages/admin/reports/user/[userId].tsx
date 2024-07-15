import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  useDeleteUserByAdminMutation,
  useGetUserByIdForPageReportLazyQuery,
} from "@/types/graphql";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import NoteCard from "@/components/admin/reportUser/noteCard";
import ReportCard from "@/components/admin/reportUser/reportCard";

const OneUserByReports = () => {
  const router = useRouter();
  const { userId } = router.query;

  // --- GET INFOS USER ---
  const [getUserReports, { data, loading, error }] =
    useGetUserByIdForPageReportLazyQuery();

  useEffect(() => {
    if (router.isReady && userId) {
      getUserReports({
        variables: { userId: userId as string },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- DELETE USER ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [
    deleteUserByAdmin,
    {
      data: dataDeleteUser,
      loading: loadingDeleteUser,
      error: errorDeleteUser,
    },
  ] = useDeleteUserByAdminMutation({
    fetchPolicy: "no-cache",
  });

  function handleDeleteUser(idUserToSupp: string): void {
    if (idUserToSupp) {
      deleteUserByAdmin({
        variables: { malfratId: idUserToSupp as string },
        onCompleted(data) {
          toast.success(data.deleteUserByAdmin.message);
          router.push(`/admin/reports/recherche`);
        },
        onError(error) {
          toast.success(error.message);
        },
      });
    }
  }

  return (
    <div>
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByIdForPageReport && (
          <main className="userIdByReports">
            <section className="infosMalfrat">
              <div>
                <h1>
                  {data.getUserByIdForPageReport.name}{" "}
                  {data.getUserByIdForPageReport.firstname}{" "}
                </h1>
                <h2>{data.getUserByIdForPageReport.id}</h2>
              </div>

              <div className="imgEmail">
                {data.getUserByIdForPageReport.imageProfil ? (
                  <img
                    src={data.getUserByIdForPageReport.imageProfil}
                    className="imgProfil"
                  />
                ) : (
                  <img src="/userDefault.png" className="imgProfil" />
                )}

                <p>{data.getUserByIdForPageReport.email}</p>
              </div>

              <div>
                <p>
                  L'utilisateur a {data.getUserByIdForPageReport.nbReportValide}{" "}
                  report valide contre lui
                </p>
                <p>
                  L'utilisateur a émis{" "}
                  {data.getUserByIdForPageReport.nbReportAjoute} reports
                </p>
              </div>

              {/* --- supp --- */}
              <div className="supp">
                <button onClick={handleClickOpen}>
                  Supprimer cet utilisateur
                </button>
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

                      if (data.getUserByIdForPageReport.email == emailUser) {
                        handleDeleteUser(data.getUserByIdForPageReport.id);

                        if (errorDeleteUser) {
                          handleClickClose();
                          toast.error(errorDeleteUser?.message);
                        }
                      } else {
                        handleClickClose();
                        toast.error("L'email ne correspond pas");
                      }
                    },
                  }}
                >
                  <DialogTitle>
                    Vous êtes entrain de supprimer un utilisateur
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Pour supprimer cet utilisateur, entrez son email :{" "}
                      {data.getUserByIdForPageReport.email}
                    </DialogContentText>
                    <TextField
                      autoFocus
                      fullWidth
                      variant="standard"
                      required
                      margin="dense"
                      id="emailUser"
                      name="emailUser"
                      label="l'email de l'utilisateur"
                      type="text"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickClose}>En fait, non</Button>
                    <Button type="submit">Hop, ça dégage!</Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* --- */}
            </section>

            <section>
              <ul className="listReports">
                <h3>Les reports contre cet utilisateur : </h3>
                {data.getUserByIdForPageReport.reports?.map((report, index) => (
                  <ReportCard
                    report={report}
                    malfratId={data.getUserByIdForPageReport.id}
                    key={index}
                  />
                ))}
              </ul>
            </section>

            <section>
              <ul className="listNotes">
                <h3>L'utilisateur à mis ces commentaires : </h3>
                {data.getUserByIdForPageReport.notesParkours?.map(
                  (note, index) => (
                    <NoteCard
                      note={note}
                      malfratId={data.getUserByIdForPageReport.id}
                      key={index}
                    />
                  )
                )}
              </ul>
            </section>

            {/* --- */}
          </main>
        )
      )}
    </div>
  );
};

export default OneUserByReports;
