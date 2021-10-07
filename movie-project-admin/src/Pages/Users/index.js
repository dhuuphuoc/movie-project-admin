import { Container, Typography, Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { Add, Delete, Edit } from "@material-ui/icons";
import useStyle from "./style";

function Users() {
  const classes = useStyle();

  return (
    <Container maxWidth="lg">
      <Typography
        style={{ marginTop: "115px !important" }}
        variant="h3"
        align="center"
        className={classes.marginTitle}
      >
        Quản lý người dùng
      </Typography>
      <div className={classes.buttonAdd}>
        <NavLink
          to="/admin/films/addUser"
          component={Button}
          startIcon={<Add />}
          className={classes.buttonEdit}
        >
          Add User
        </NavLink>
      </div>
    </Container>
  );
}

export default Users;
