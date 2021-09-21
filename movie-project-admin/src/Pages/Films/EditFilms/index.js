import React, { useEffect, useState } from 'react'
import { Form, InputNumber, Switch, DatePicker, Input } from 'antd'
import { useFormik } from 'formik';
import { Container, Typography, Button } from '@material-ui/core'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhapPhim, layThongTinPhim } from '../../../Redux/action/QuanLyFilmsAction';

export default function EditFilms(props) {
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch();
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    const [img, setImg] = useState("");

    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinPhim(id))
    }, [])

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: thongTinPhim.hinhAnh,
            maNhom: "GP01",
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formik.values)
        const {values} = formik

        let formData = new FormData();
        for(let key in values){
            if(key !== 'hinhAnh'){
                formData.append(key, values[key]);
            }else{
                if(values.hinhAnh == null){
                    formData.append("File", values.hinhAnh, values.hinhAnh.name)
                }
            }
        }
        dispatch(capNhapPhim(formData))
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeNgayChieu = (value) => {
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeFile = (e) => {
        // console.log('e', e.target.files[0]);
        if(e.target.files[0]){
            formik.setFieldValue('hinhAnh', e.target.files[0]);
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setImg(reader.result);
            reader.onload = function (e){
                setImg(e.target.result);
            }
        }
    }

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
                <Typography className="mt-5 mb-5" component="h2" variant="h4" align="center">Chỉnh sữa phim</Typography>
                <Form.Item label="Ten Phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer}/>
                </Form.Item>

                <Form.Item label="Mo ta">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>

                <Form.Item label="Ngay khoi chieu">
                    <DatePicker name="ngayKhoiChieu" format={'DD/MM/YYYY'} onChange={handleChangeNgayChieu} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>

                <Form.Item label="Dang chieu">
                    <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>

                <Form.Item label="Sap chieu" >
                    <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot"  >
                    <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot}/>
                </Form.Item>

                <Form.Item label="Danh gia">
                    <InputNumber onChange={handleChangeNumber('danhGia')} min={1}
                        max={10}
                        value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hinh anh">
                    <input type="file" onChange={handleChangeFile} />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={img === '' ? thongTinPhim.hinhAnh : img}/>
                </Form.Item>

                <Form.Item className="text-center">
                    <Button variant="contained" color="primary" type="Submit">Cập nhập</Button>
                </Form.Item>
            </Form>
        </Container>
    )
}
