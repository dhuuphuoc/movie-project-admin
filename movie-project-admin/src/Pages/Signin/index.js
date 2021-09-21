import { Container, InputAdornment, TextField, Button } from '@material-ui/core'
import { Typography } from 'antd'
import React from 'react'
import { useFormik } from 'formik';
import { AccountCircle, Lock } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { dangNhap } from '../../Redux/action/QuanLyAccountAction';
import { useHistory } from 'react-router';

export default function Signin() {
    const dispatch = useDispatch()
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: ''
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(dangNhap(formik.values, goToAdmin))
    }

    const goToAdmin = () =>{
        history.push("/admin")
    }

    return (
        <> 
            <Typography align="center" className="mt-5 mb-4" variant="h4" component="h1">
                Wellcome to Admin Page
            </Typography>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField value={formik.values.taiKhoan} onChange={formik.handleChange} name="taiKhoan" multiline placeholder="Tài khoản" margin="normal" variant="outlined" label="" fullWidth InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}/>
                    </div>
                    <div>
                        <TextField value={formik.values.matKhau} onChange={formik.handleChange} name="matKhau" margin="normal" placeholder="Mật khẩu" variant="outlined" fullWidth InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }} />
                    </div>
                    <div className="text-center">
                        <Button color="primary" type="submit" variant="contained">
                            Đăng nhập
                        </Button>
                    </div>

                </form>
            </Container>
        </>
    )
}
