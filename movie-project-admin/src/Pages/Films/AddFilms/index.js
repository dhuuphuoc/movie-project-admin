import { Container, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Form, InputNumber, Switch, DatePicker, Input } from 'antd'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinh } from '../../../Redux/action/QuanLyFilmsAction';
import moment from 'moment';
import './style.css'



export default function AddFilms() {
    const [componentSize, setComponentSize] = useState('default');
    const [img, setImg] = useState('')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            tenPhim:'',
            trailer:'',
            moTa:'',
            ngayKhoiChieu:'',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia:0,
            hinhAnh:{},
            maNhom: "GP01",
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("value", formik.values)
        const {values} = formik
        let formData = new FormData()
        for(let key in values){
            if(key !== 'hinhAnh'){
                formData.append(key, values[key])
            }else{
                formData.append('File', values.hinhAnh, values.hinhAnh.name)
            }
        }
        dispatch(themPhimUploadHinh(formData))
    }

    const handleChangeSwitch = (name) =>{
        return (value) =>{
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeNumber = (name) =>{
        return (value) =>{
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeNgayChieu =(value)=>{
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeFile = (e) =>{
        let file = e.target.files[0];
        console.log(file)

        if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type ==='image/png'){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) =>{
                setImg(e.target.result)
            }
        }
        formik.setFieldValue('hinhAnh', file)
    }


    const onFormLayoutChange = ({size}) => {
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
                <Typography className="mb-5" component="h2" variant="h4" align="center">Th??m Phim M???i</Typography>
                <Form.Item label="T??n phim"
                    style={{ fontWeight: 700 }}>
                    <Input name="tenPhim" onChange={formik.handleChange}/>
                </Form.Item>

                <Form.Item label="Trailer"
                    style={{ fontWeight: 700 }}
               >
                    <Input name="trailer" onChange={formik.handleChange}/>
                </Form.Item>

                <Form.Item label="M?? t???"
                    style={{ fontWeight: 700 }}>
                    <Input name="moTa" onChange={formik.handleChange}/>
                </Form.Item>

                <Form.Item label="Ng??y kh???i chi???u"
                    style={{ fontWeight: 700 }}>
                    <DatePicker name="ngayKhoiChieu" format={'DD/MM/YYYY'} onChange={handleChangeNgayChieu} />
                </Form.Item>

                <Form.Item label="??ang chi???u"
                    style={{ fontWeight: 700 }} >
                    <Switch name="dangChieu"  onChange={handleChangeSwitch('dangChieu')}/>
                </Form.Item>

                <Form.Item label="S???p chi???u"
                    style={{ fontWeight: 700 }} >
                    <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')}/>
                </Form.Item>
                <Form.Item label="Hot"
                    style={{ fontWeight: 700 }}  >
                    <Switch name="hot" onChange={handleChangeSwitch('hot')}/>
                </Form.Item>

                <Form.Item label="????nh gi??"
                    style={{ fontWeight: 700 }}>
                    <InputNumber onChange={handleChangeNumber('danhGia')}/>
                </Form.Item>

                <Form.Item label="H??nh ???nh"
                    style={{ fontWeight: 700 }}>
                    <input type="file"  onChange={handleChangeFile}/>
                    <br />
                    <img style={{width:150, height:150}} src={img}/>
                </Form.Item>

                <Form.Item className="text-center">
                    <Button variant="contained" color="primary" type="Submit">Them phim</Button>
                </Form.Item>
            </Form>
        </Container>
    )
}
