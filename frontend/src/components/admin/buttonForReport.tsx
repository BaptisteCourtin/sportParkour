import {
  useDeleteNoteAndAddOneReportValideMutation,
  useLetNoteMutation,
} from "@/types/graphql";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsisVertical } from "react-icons/fa6";

// button action sur un commentaire, version page de modération
const buttonForReport = ({
  reportId,
  malfratId,
  parkourId,
  commentaire,
  removeReportFromList,
}: {
  reportId: number;
  malfratId: string;
  parkourId: number;
  commentaire: string;
  removeReportFromList: any;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --- LAISSER ---
  const [
    letNote,
    { data: dataLetNote, loading: loadingLetNote, error: errorLetNote },
  ] = useLetNoteMutation();

  const handleLetNote = () => {
    letNote({
      variables: {
        reportId: +reportId,
      },
      onCompleted(data) {
        toast.success(data.letNote.message);
        removeReportFromList(+reportId);
      },
      onError(error) {
        toast.error(error.message);
      },
    });

    setAnchorEl(null);
  };

  // --- SUPPRIMER ET 1 PT DE REPORT ---
  const [
    deleteNoteAndReport,
    {
      data: dataDeleteNoteAndReport,
      loading: loadingDeleteNoteAndReport,
      error: errorDeleteNoteAndReport,
    },
  ] = useDeleteNoteAndAddOneReportValideMutation();

  const handleSuppAndReport = () => {
    deleteNoteAndReport({
      variables: {
        reportId: +reportId,
        malfratId: malfratId,
        parkourId: +parkourId,
        commentaire: commentaire,
      },
      onCompleted(data) {
        toast.success(data.deleteNoteAndAddOneReportValide.message);
        removeReportFromList(+reportId);
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
        <MenuItem onClick={handleLetNote}>Laisser</MenuItem>
        <MenuItem onClick={handleSuppAndReport}>
          Supprimer et 1 pt de report
        </MenuItem>
      </Menu>
    </div>
  );
};

export default buttonForReport;
