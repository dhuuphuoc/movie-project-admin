import React, { memo, useEffect, useState } from 'react'
import { Form, Button, Select, InputNumber, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { Container, Typography } from '@material-ui/core';
import { request } from '../../Api';
import moment from 'moment';
import './style.css'


 function ShowTime(props) {
    const [state, setState] = useState({
        heThongRapChieu:[],
        cumRapChieu:[],
    })

    const formik = useFormik({
        initialValues:{
            maPhim: props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:'',
        }
    })

    const {values} = formik
     const handleSubmit = () =>{
        request({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
            method: "POST",
            data: values
        })
        .then((res)=>{
            alert("Thêm thành công")
        })
        .catch((errors)=>{

        })
     }

    useEffect(async ()=>{
       await request({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
            method: "GET",
        })
        .then((res)=>{
            setState({
                ...state,
                heThongRapChieu: res.data.content
            })
        })
        .catch(()=>{

        })
    },[])

    const handleChangeHeThongRap = async (maHeThongRap) =>{
        await request({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
            method: "GET",
            params: {
                maHeThongRap
            }
        })
        .then((res)=>{
             setState({
                ...state,
                cumRapChieu: res.data.content
            })
        })
        .catch((errors)=>{
            console.log('errors', errors.response?.data)
        })
    }

    const converSelectHTR = () =>{
         return state.heThongRapChieu.map((htr,index)=>{
             return {
                 label:htr.tenHeThongRap, value:htr.maHeThongRap
             }
         })
    }

    const handleChangeCumRap = (value)=>{
        formik.setFieldValue('maRap', value)
    }

    const onChangeDate = (value) =>{
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onOk = (values) =>{
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onChangeInputNumber = (values) =>{
        formik.setFieldValue('giaVe', values)
        console.log('value', values)
    }

    let film ={};
    if(localStorage.getItem('filmParams')){
        film = JSON.parse(localStorage.getItem('filmParams'))
    }
    return (
        <Container>
            <Form name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onSubmitCapture={handleSubmit}>

                <div className="text-center">
                    <Typography style={{ marginTop: "115px !important" }} className=" mb-3" component="h2" variant="h4" align="center">Chỉnh sữa phim</Typography>
                    <img className="mb-5"/>
                </div>

                <Form.Item
                    label="Hệ thống rạp"
                    style={{fontWeight: 700}}
                >
                    <Select options={converSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chon he thong rap" />
                    {/* state.heThongRapChieu?.map((htr, index)=>({label:htr.maHeThongRap,value:htr.tenHeThongRap})) */}
                </Form.Item>
                <Form.Item
                    label="Cụm rạp"
                    style={{ fontWeight: 700 }}
                >
                    <Select options={state.cumRapChieu.map((cumRap,index)=>({ label:cumRap.tenCumRap, value:cumRap.maCumRap}))} onChange={handleChangeCumRap}  placeholder="Chon cum rap" />
                </Form.Item>
                <Form.Item
                    label="Ngày giờ chiêu"
                    style={{ fontWeight: 700 }}
                >
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />,
                </Form.Item>
                <Form.Item
                    label="Đánh giá"
                    style={{ fontWeight: 700 }}
                >
                    <InputNumber min={75000} max={150000} onChange={onChangeInputNumber}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Tao lich chieu
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    )
}


export default memo(ShowTime)