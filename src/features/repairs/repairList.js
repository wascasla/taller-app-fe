import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, InputBase, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { repair } from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingDialog from "../../components/loadingDialog/LoadingDialog";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

export const RepairList = ({ car }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ["repairs", car._id],
    () => repair.getRepairsByIdCar(car._id),
    { keepPreviousData: true }
  );

  useEffect(() => {
    refetch();
  }, [car._id]);


  useEffect(() => {
    if (error) {
      toast.error("Ocurrio un error al obtener los datos, por favor intenta nuevamente!  ");
    }
  }, [error]);

  const mutatePostRepair = useMutation((data) => repair.createRepair(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("repairs");
      toast.success("Registro agregado con exito!!! ");
      cleanForm();
      setShowModal(false);
    },
    onError: (error, variables, context) => {
      toast.error("Ocurrio un error, por favor intenta nuevamente!  ");
    },
  });

  const cleanForm = () => {
    setDate("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutatePostRepair.mutate({ description, date, car: car._id });
  };

  const handleClose = () => {
    setShowModal(false);
    cleanForm();
  };

  const newRow = () => {
    cleanForm();
    setShowModal(true);
  };

  return (
    <Grid container spacing={3}>
      <LoadingDialog show={mutatePostRepair.isLoading} />
      <Grid item xs={12}>
        <h2>{`Reparaciones del auto:   ${car.brand} - ${car.year} `} </h2>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }} onClick={newRow}>
          Nueva Reparación
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              columns={[
                {
                  field: "_id",
                  headerName: "ID",
                  width: 200,
                },
                { field: "description", headerName: "Descripción", width: 250 },
                { field: "date", headerName: "Fecha", width: 250 },
              ]}
              pagination={false}
              rows={data?.data || []}
              getRowId={(row) => row._id}
              loading={isLoading || isFetching}
            />
          </div>
          <Dialog open={showModal} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>{"Agregar Reparación"}</DialogTitle>
              <DialogContent>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  margin="dense"
                  required
                  value={description}
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  label="Fecha"
                  variant="outlined"
                  margin="dense"
                  required
                  value={date}
                  fullWidth
                  type={"date"}                
                  onChange={(e) => setDate(e.target.value)}
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
        </Paper>
      </Grid>
    </Grid>
  );
};
