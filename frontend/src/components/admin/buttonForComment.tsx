import {
  useDeleteNoteAndAddOneReportValideAndCreateReportMutation,
  useReportNoteMutation,
} from "@/types/graphql";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsisVertical } from "react-icons/fa6";

// button action sur un commentaire, version page du parkour
const buttonForComment = ({
  malfratId,
  parkourId,
  commentaire,
  isAdmin,
  isClient,
}: {
  malfratId: string;
  parkourId: number;
  commentaire: string;
  isAdmin: boolean;
  isClient: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --- REPORT ---
  const [reportNote, { loading, error }] = useReportNoteMutation();

  function handleReportNote(): void {
    reportNote({
      variables: {
        parkourId: +parkourId,
        malfratId: malfratId,
        commentaire: commentaire,
      },
      onCompleted(data) {
        toast.success(data.reportNote.message);
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }

  // --- SUPPRIMER ET CREER ET 1 PT DE REPORT ---
  const [
    deleteNoteAndCreateReport,
    {
      data: dataDeleteNoteAndReport,
      loading: loadingDeleteNoteAndReport,
      error: errorDeleteNoteAndReport,
    },
  ] = useDeleteNoteAndAddOneReportValideAndCreateReportMutation({
    fetchPolicy: "no-cache",
  });

  const handleSuppAndCreateReport = () => {
    deleteNoteAndCreateReport({
      variables: {
        malfratId: malfratId,
        parkourId: +parkourId,
        commentaire: commentaire,
      },
      onCompleted(data) {
        toast.success(
          data.deleteNoteAndAddOneReportValideAndCreateReport.message
        );
      },
      onError(error) {
        toast.error(error.message);
      },
    });
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FaEllipsisVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "230px",
          },
        }}
      >
        {/* mettre ou non suivant le status actuel */}
        {isClient ? (
          <MenuItem onClick={handleReportNote}>Reporter</MenuItem>
        ) : null}
        {isAdmin ? (
          <MenuItem onClick={handleSuppAndCreateReport}>
            Supprimer et 1 pt de report
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  );
};

export default buttonForComment;
