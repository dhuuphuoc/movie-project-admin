import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Redirect } from "react-router-dom";
import { signOut } from "../../Redux/reducer/QuanLyAccountReducer";
import { ADMIN_LOGIN } from "../../util/Setting/config";
import './style.css'

export const AdminTemplate = (props) => {
    const { adminSignin } = useSelector(state => state.QuanLyAccountReducer)
    const dispatch = useDispatch()
    if (!localStorage.getItem(ADMIN_LOGIN)){ 
        if (adminSignin.maLoaiNguoiDung !== 'QuanTri') {
            return <Redirect to='/signin' />
        }
        return <Redirect to='/signin'/>
    }
  
    

    const { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return (
            <Fragment>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                                <span className="navbar-toggler-icon" data-bs-target="#sidebar" />
                            </button>
                            <a className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold">Movie Dashboard</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNavBar" aria-controls="topNavBar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" data-bs-target="#topNavBar" />
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="topNavBar">
                            <ul className="navbar-nav ms-auto my-3 my-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-fill" /> <span>Hello, {adminSignin.taiKhoan}</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item text-up" onClick={()=>{
                                            dispatch(signOut())
                                        }}>Sign out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="offcanvas offcanvas-start sidebar-nav bg-dark" tabIndex={-1} id="sidebar">
                        <div className="offcanvas-body p-0">
                            <nav className="navbar-dark mt-5">
                                <ul className="navbar-nav">
                                    <li>
                                        <div className="text-muted small fw-bold text-uppercase px-3">
                                            <h6 className="bg-color">CORE</h6>
                                        </div>
                                    </li>
                                    <li style={{ display: "flex", alignItems: "center", padding: 20 }}>
                                        <span style={{ color: "white", fontSize: 20 }} className="me-2 mr-4"><i className="bi bi-speedometer2" /></span>
                                        <NavLink className="bg-color-1" to="/admin">Dashboard</NavLink>
                                    </li>
                                    <li className="my-4">
                                        <hr className="dropdown-divider bg-light" />
                                    </li>
                                    <li>
                                        <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                                            <h6 className="bg-color">Manager movie</h6>
                                        </div>
                                    </li>
                                    <li style={{ display:"flex", alignItems:"center", padding:15}}>
                                        <span style={{ color: "white", fontSize: 20 }} className="me-2 mr-4" ><i className="bi bi-layout-split" /></span>
                                            <NavLink className="bg-color-1" to="/admin/users">User</NavLink>

                                    </li>
                                    <li className="my-4">
                                        <hr className="dropdown-divider bg-light" />
                                    </li>
                                    <li>
                                        <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                                            <h6 className="bg-color"> Manager User</h6>
                                        </div>
                                    </li>
                                    <li style={{ display: "flex", alignItems: "center", padding: 15 }}>
                                     
                                        <span style={{ color: "white", fontSize: 20 }} className="me-2 mr-4"><i className="bi bi-film" /></span>
                                            <NavLink className="bg-color-1" to="/admin/films">Movie</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <main className="main">
                    <Component {...propsRoute} />
                </main>
            </Fragment>
        )
    }} />
}
