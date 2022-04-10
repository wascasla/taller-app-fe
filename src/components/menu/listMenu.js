import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";

export const MainListItems = ({setTitle}) => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem
        button
        onClick={() => {
          navigate("/");
          setTitle("Dashboard");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/clients");
          setTitle("Clientes");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </List>
  );
};