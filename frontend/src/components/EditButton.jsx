import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../api/axios";
import useRefresh from "../context/useRefresh";

function PenButton({ targetValue }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const refresh = useRefresh();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    const newToken = await refresh();
    const targetLink =
      "/users/" + targetValue + "?" + targetValue + "=" + inputValue;
    const response = await axios.put(
      targetLink,
      {},
      {
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    setOpen(false);

    window.location.reload();
  };

  return (
    <>
      <EditIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Text</DialogTitle>
        <DialogContent>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default PenButton;
