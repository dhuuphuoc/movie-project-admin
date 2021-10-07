import { Container, Typography, Button, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { addUser, getTypeUser } from "../../../Redux/action/QuanLyUserAction";
import { MenuItem } from "rc-menu";
import FormList from "antd/lib/form/FormList";

function AddUser() {
  const [componentSize, setComponentSize] = useState("default");
  const [typeUser, getTypeUser] = useState([]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      let data = JSON.stringify(values, null, 2);
      dispatch(addUser(data));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Container>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Typography className="mb-5" component="h2" variant="h4" align="center">
          Thêm Người dùng
        </Typography>
        <Form.Item label="Tên tài khoản" style={{ fontWeight: 700 }}>
          <Input
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>

        <Form.Item label="Họ tên" style={{ fontWeight: 700 }}>
          <Input
            id="hoTen"
            name="hoTen"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Form.Item label="Mật khẩu" style={{ fontWeight: 700 }}>
          <Input
            id="matKhau"
            name="matKhau"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>

        <Form.Item label="Email" style={{ fontWeight: 700 }}>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item label="Số điện thoại" style={{ fontWeight: 700 }}>
          <Input
            id="soDt"
            name="soDt"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>

        <Form.Item label="Mã loại người dùng" style={{ fontWeight: 700 }}>
          <Select
            id="maLoaiNguoiDung"
            name="maLoaiNguoiDung"
            value={formik.values.maLoaiNguoiDung}
            onChange={formik.handleChange}
            style={{ display: "block" }}
          >
            <option value="" label="Select type" />
            <option value="KhachHang" label="Khách hàng" />
            <option value="QuanTri" label="Quản trị" />

            {typeUser.map((item) => (
              <option value={item.maLoaiNguoiDung} label={item.tenLoai} />
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="text-center">
          <Button variant="contained" color="primary" type="Submit">
            Thêm user
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AddUser;
