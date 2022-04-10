import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingDialog = ({ show }) => {
  return (
    <>
      {show ? (
        <Backdrop sx={{ color: "#fff", zIndex: 10000 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </>
  );
};

export default LoadingDialog;