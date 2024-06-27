import NoteCard from "@/components/admin/noteCard";
import ReportCard from "@/components/admin/reportCard";
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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        onCompleted(data) {
          console.log(data);
        },
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
    <main className="userIdByReports">
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByIdForPageReport && (
          <div>
            <section className="infosMalfrat">
              <h1>
                {data.getUserByIdForPageReport.name}{" "}
                {data.getUserByIdForPageReport.firstname}{" "}
              </h1>
              <h2>{data.getUserByIdForPageReport.id}</h2>
              <p>{data.getUserByIdForPageReport.email}</p>
              <p>
                L'utilisateur a {data.getUserByIdForPageReport.nbReportValide}{" "}
                report valide contre lui
              </p>
              <p>
                L'utilisateur a émis{" "}
                {data.getUserByIdForPageReport.nbReportAjoute} reports
              </p>
              {/* --- supp --- */}
              <div className="supp">
                <Button variant="outlined" onClick={handleClickOpen}>
                  Supprimer cet utilisateur{" "}
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
                      const nameUser = formJson.nameUser;

                      if (data.getUserByIdForPageReport.name == nameUser) {
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
                      Pour supprimer cet utilisateur, entrez son nom :
                      {data.getUserByIdForPageReport.name}
                    </DialogContentText>
                    <TextField
                      autoFocus
                      fullWidth
                      variant="standard"
                      required
                      margin="dense"
                      id="nameUser"
                      name="nameUser"
                      label="votre name"
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
          </div>
        )
      )}
    </main>
  );
};

export default OneUserByReports;
