import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export const FormAddClient = ({showModal, handleClose, handleSubmit, name, setName, phone, setPhone}) => {
  return (
    <Dialog open={showModal} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{"Agregar Cliente"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            margin="dense"
            required
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Telefono"
            variant="outlined"
            margin="dense"
            required
            value={phone}
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancelar
          </Button>
          <Button type="submit" startIcon={<SaveIcon />} variant="contained" color="secondary">
            {"Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
