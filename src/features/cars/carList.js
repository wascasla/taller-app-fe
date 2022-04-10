import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { car } from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingDialog from "../../components/loadingDialog/LoadingDialog";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { RepairList } from "../repairs/repairList";

export const CarList = () => {
  const [showModal, setShowModal] = useState(false);
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const queryClient = useQueryClient();
  const params = useParams();
  const owner = params.idClient;
  const [selectedCar, setSelectedCar] = useState();
  
  const [showRepairs, setShowRepairs] = useState(false);


  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ["cars"],
    () => car.getCarsByIdClient(params.idClient),
    { keepPreviousData: true } 
  );

  useEffect(() => {
    if (data?.data?.cod === 1) {
      toast.error(data.data.message);
    }
  }, [data]); 

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]); 

 
  const mutatePostCar = useMutation((data) => car.createCar(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("cars");
      toast.success("Registro agregado con exito!!! ");
      cleanForm();
      setShowModal(false);
    },
    onError: (error, variables, context) => {
      toast.error("Ocurrio un error, por favor intenta nuevamente!  ");
    },
  });  

  const cleanForm = () => {
    setBrand("");
    setYear("");
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    mutatePostCar.mutate({ brand, year, owner }); 
  };

  const handleClose = () => {
    setShowModal(false);
    cleanForm();
  };  

  const newRow = () => {
    cleanForm();
    setShowModal(true);
  };

  const showRepairsCar = (car) => {
    setSelectedCar(car);
    setShowRepairs(true);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>

      <h2>{`Autos del cliente   ${owner}  ` }  </h2>
      </Grid>    
      <LoadingDialog
        show={ mutatePostCar.isLoading }
      />
      <Grid item xs={12}>

      <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={newRow}
            >
              Nuevo Auto
            </Button>
          </div>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              columns={[
                {
                  field: "_id",
                  headerName: "ID",
                  width: 250,
                },
                { field: "brand", headerName: "Marca", width: 150 },
                { field: "year", headerName: "Modelo", width: 150 },
                {
                  field: "actions",
                  type: "actions",
                  headerName: "Ver Reparaciones",
                  width: 300,
                  getActions: (params) => [
                    <Button
                      startIcon={<VisibilityIcon />}
                      variant="contained"
                      color="secondary"
                      onClick={() => showRepairsCar(params.row)}
                    >
                      {"ver"}
                    </Button>
                  ]
                }  
              ]}
              rows={data?.data || []}
              getRowId={(row) => row._id}
              loading={isLoading || isFetching}
            />
          </div>
          <Dialog open={showModal} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>
                {"Agregar Auto"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Marca"
                  variant="outlined"
                  margin="dense"
                  required
                  value={brand}
                  fullWidth
                  onChange={(e) => setBrand(e.target.value)}
                />
                <TextField
                  type={"number"}
                  label="Modelo"
                  variant="outlined"
                  margin="dense"
                  required
                  value={year}
                  fullWidth
                  onChange={(e) => setYear(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="secondary"
                >
                  {"Guardar"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Paper>
      </Grid>

      {
        showRepairs  ? 
        <Grid item xs={12}>
             <RepairList car={selectedCar} />
        </Grid>
        : null
      }
    </Grid>
  );
};
