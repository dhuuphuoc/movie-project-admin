import { Form, InputNumber, Switch, DatePicker, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Container, Typography, Button } from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhapUser,
  layThongTinUser,
} from "../../../Redux/action/QuanLyUserAction";

export default function EditUser(props) {
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinUser } = useSelector((state) => state.QuanLyUserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    let { taiKhoan } = props.match.params;
    dispatch(layThongTinUser(taiKhoan));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinUser.taiKhoan,
      matKhau: thongTinUser.matKhau,
      email: thongTinUser.email,
      soDt: thongTinUser.soDt,
      maLoaiNguoiDung: thongTinUser.maLoaiNguoiDung,
      hoTen: thongTinUser.hoTen,
      maNhom: "GP01",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(capNhapUser(formik.values));
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Container>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Typography className="mb-5" component="h2" variant="h4" align="center">
          Chỉnh sửa User
        </Typography>
        <Form.Item label="Tài khoản" style={{ fontWeight: 700 }}>
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>

        <Form.Item label="Họ tên" style={{ fontWeight: 700 }}>
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Form.Item label="Email" style={{ fontWeight: 700 }}>
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item label="Số điện thoại" style={{ fontWeight: 700 }}>
          <Input
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>

        <Form.Item label="Mật khẩu" style={{ fontWeight: 700 }}>
          <Input
            name="matKhau"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button variant="contained" color="primary" type="Submit">
            Cập nhập
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
