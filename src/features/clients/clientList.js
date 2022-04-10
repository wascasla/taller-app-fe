import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { clients } from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import LoadingDialog from "../../components/loadingDialog/LoadingDialog";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FormAddClient } from "./FormAddClient";

export const ClientList = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ["clients"],
    () => clients.getClients(),
    { keepPreviousData: true }  
  );

  useEffect(() => {
    if (error) {
      toast.error("Ocurrio un error al obtener los datos, por favor intenta nuevamente!  ");
    }
  }, [error]);

  const mutatePostClient = useMutation((data) => clients.createClient(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      toast.success("Registro agregado con exito!!! ");
      cleanForm();
      setShowModal(false);
    },
    onError: (error, variables, context) => {
      toast.error("Ocurrio un error, por favor intenta nuevamente!  ");
    },
  });

  const cleanForm = () => {
    setName("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutatePostClient.mutate({ name, phone });
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
      <LoadingDialog
        show={ mutatePostClient.isLoading }
      />
      <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={newRow}
            >
              Nuevo Cliente
            </Button>
          </div>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              columns={[
                {
                  field: "_id",
                  headerName: "ID",
                  width: 150,
                },
                { field: "name", headerName: "Nombre", width: 150 },
                { field: "phone", headerName: "Telefono", width: 150 },
                {
                  field: "actions",
                  type: "actions",
                  headerName: "Ver Autos",
                  width: 100,
                  getActions: (params) => [
                    <Link
                      style={{ display: "block", margin: "1rem 0" }}
                      to={`/cars/${params.id}`}
                      key={params.id}
                    >
                      {"ver"}
                    </Link>
                  ]
                }  
              ]}
              rows={data?.data || []}
              getRowId={(row) => row._id}
              loading={isLoading || isFetching}
            />
          </div>
          <FormAddClient showModal={showModal} handleClose={handleClose} handleSubmit={handleSubmit} name={name} setName={setName} phone={phone} setPhone={setPhone} />          
        </Paper>
      </Grid>
    </Grid>
  );
};
