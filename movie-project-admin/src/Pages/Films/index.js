import React, { memo, useEffect } from "react";
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,
    Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilmList, xoaPhim } from "../../Redux/action/QuanLyFilmsAction";
import { Add, Delete, Edit } from "@material-ui/icons";
import useStyle from "./style";
import { Pagination } from "@material-ui/lab";
import { SET_PAGE } from "../../Redux/type/QuanLyPhimType";
import { NavLink } from "react-router-dom";


function Films() {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.QuanLyPhimReducer);
    const { movieList } = useSelector((state) => state.QuanLyPhimReducer);
    const classes = useStyle()

    useEffect(() => {
        dispatch(fetchFilmList(page));
    }, [dispatch, page]);

    const handleChangePage = (e,value) =>{
        e.preventDefault()
        dispatch({
            type: SET_PAGE,
            payload: value
        })
        dispatch(fetchFilmList(value))
    }
    const handleDelete = (movie) =>{
        return() =>{
            if (window.confirm(`Bạn có muốn xóa  ${movie.tenPhim} không`)){
                dispatch(xoaPhim(movie.maPhim))
            }
        }
    }

    return (
        <Container maxWidth="lg">
            <Typography style={{ marginTop: "115px !important" }} variant="h3" align="center" className={classes.marginTitle}>
                Quản lý phim
            </Typography>
            <div className={classes.buttonAdd}>
                <NavLink to="/admin/films/addfilms" component={Button} startIcon={<Add/>} className={classes.buttonEdit}>
                    Add Movie
                </NavLink>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã phim</TableCell>
                            <TableCell align="center">Hình ảnh</TableCell>
                            <TableCell align="center">Tên phim</TableCell>
                            <TableCell align="center">Mô tả</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieList &&
                            movieList?.items?.map((movie, index) => {
                                return <TableRow key={index}>
                                    <TableCell padding="default" align="center" component="th" scope="row" >{movie.maPhim}</TableCell>
                                    <TableCell align="center"><img src={movie.hinhAnh} style={{width:60, height:60}}/></TableCell>
                                    <TableCell align="center">{movie.tenPhim}</TableCell>
                                    <TableCell align="center">{movie.moTa.length > 50 ? movie.moTa.slice(0,50) + '...': movie.moTa}</TableCell>
                                    <TableCell align="right">
                                        <NavLink component={Button} to={`/admin/films/editfilms/${movie.maPhim}`} className={classes.buttonEdit}  variant="contained" startIcon={<Edit/>}>Edit</NavLink>
                                        <Button className={classes.buttonDelete} variant="contained" startIcon={<Delete/>} onClick={handleDelete(movie)}>Delete</Button>
                                    </TableCell>
                                    </TableRow>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination 
            count={movieList?.totalPages}
            onChange={handleChangePage}
            defaultPage={page}
            className={classes.pagination}
            />
        </Container>
    );
}

export default memo(Films);
