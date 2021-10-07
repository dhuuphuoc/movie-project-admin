import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Add, Delete, Edit } from "@material-ui/icons";
import useStyle from "./style";
import { Input } from "antd";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../../Redux/action/QuanLyUserAction";

function Users() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.QuanLyUserReducer);

  const { Search } = Input;

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const onSearch = (value) => {
    dispatch(getUserList(value));
  };

  const handleDelete = (user) => {
    return () => {
      if (window.confirm(`Bạn có muốn xóa  ${user.hoTen} không`)) {
        dispatch(deleteUser(`${user.taiKhoan}`));
      }
    };
  };

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
      <Search
        className="mb-4"
        placeholder="Input Search"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tài khoản</TableCell>
              <TableCell align="center">Họ tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList &&
              userList?.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      padding="default"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{user.taiKhoan}</TableCell>
                    <TableCell align="center">{user.hoTen}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.soDt}</TableCell>
                    <TableCell align="cennter" style={{ textAlign: "center" }}>
                      <NavLink
                        component={Button}
                        to={`/admin/films/editUser/${user.taiKhoan}`}
                        className={classes.buttonEdit}
                        variant="contained"
                        startIcon={<Edit style={{ marginRight: "0" }} />}
                      ></NavLink>
                      <Button
                        className={classes.buttonDelete}
                        variant="contained"
                        startIcon={<Delete style={{ marginRight: "0" }} />}
                        onClick={handleDelete(user)}
                      ></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Users;
